const sql = require("mssql/msnodesqlv8");
const db = require("../db").connection;
const regex = require("../regex");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const upload = require("../multerConfig");
const sharp = require("sharp");

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM [user] WHERE email = @email");

    if (result.recordset.length === 0) {
      res.status(404).json({
        message: "User not found!",
      });
    } else {
      const hashedPassword = result.recordset[0].password;
      const passwordMatch = await argon2.verify(hashedPassword, password);

      if (passwordMatch) {
        const tokenPayload = {
          userId: result.recordset[0].user_id,
          name: result.recordset[0].full_name,
          username: result.recordset[0].username,
          email: result.recordset[0].email,
          biography: result.recordset[0].biography,
          picture: result.recordset[0].profile_picture_src,
          role: result.recordset[0].role_id,
        };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "365d" });

        // Log user signin in database table user_login

        const log = await pool.query(
          `INSERT INTO user_login(user_id) VALUES(${tokenPayload.userId})`
        );

        res.status(200).json({
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect password!",
        });
      }
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
async function regions(req, res) {
  try {
    const pool = await db;
    const result = await pool.query("SELECT * FROM continent");

    const continents = result.recordset;
    res.json(continents);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
async function countries(req, res) {
  const region = req.body.region;
  try {
    const pool = await db;
    const result = await pool.request().input("region", sql.NVarChar, region)
      .query(`SELECT c.* FROM country c
      JOIN continent_country cc ON c.country_id = cc.country_id
      WHERE cc.continent_id = @region `);
    if (result.recordset.length === 0) {
      res.status(404).json({
        message: "No countries for this region are found!",
      });
    } else {
      const countries = result.recordset;
      res.json(countries);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function signup(req, res) {
  const { fullName, username, email, password, region, country } = req.body;
  try {
    if (!regex.passwordRegex.test(password)) {
      throw new Error("Password is not in the right format!");
    }
    if (!regex.fullNameRegex.test(fullName)) {
      throw new Error("Name is not in the right format!" + fullName);
    }
    if (!regex.emailRegex.test(email)) {
      throw new Error("Email is not in the right format!");
    }
    if (country < 1) {
      throw new Error("Wrong type of country!");
    }

    // Pool initialization
    const pool = await db;

    const newUsername = `@${username}`;

    // Check if there is account with the same username
    const getUsername =
      "SELECT username from [user] WHERE username = @username";
    const sameUsernameResult = await pool
      .request()
      .input("username", sql.NVarChar, newUsername)
      .query(getUsername);

    if (sameUsernameResult.recordset.length !== 0) {
      throw new Error("Username is taken!");
    }

    // Check if there is account with the same email address
    const getEmail = "SELECT email from [user] WHERE email = @email";
    const sameEmailResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(getEmail);

    if (sameEmailResult.recordset.length !== 0) {
      throw new Error("Account with this email already exist!");
    }

    // Password hashing
    const hashedPassword = await argon2.hash(password);

    const result = await pool
      .request()
      .input("name", sql.NVarChar, fullName)
      .input("username", sql.NVarChar, newUsername)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .input("country", sql.Int, country)
      .query(
        `INSERT INTO [user](full_name, username, email, password, profile_picture_src, country_id, role_id)
        OUTPUT INSERTED.user_id
      VALUES(@name, @username, @email, @password, 'anonymous.png', @country, 2)`
      );
    const userId = result.recordset[0].user_id;

    const tokenPayload = {
      userId: userId,
      name: fullName,
      username: username,
      email: email,
      biography: null,
      picture: "anonymous.png",
      role: 2,
    };
    console.log(tokenPayload);
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "365d" });

    res.status(201).json({
      message: "You have successfully signed up!",
      token: token,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: `${error}` });
  }
}

async function searchPeople(req, res) {
  const name = req.body.name;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("val", sql.NVarChar, `%${name}%`)
      .query(
        "SELECT TOP 10 user_id, username, profile_picture_src FROM [user] WHERE username LIKE @val OR full_name LIKE @val"
      );

    if (result.recordset.length === 0) {
      res
        .status(200)
        .json({ message: "There are none users with this username!" });
    } else {
      const users = result.recordset;
      res.status(200).json(users);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function isFollowing(req, res) {
  const { you, him } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("you", sql.Int, you)
      .input("him", sql.Int, him)
      .query(
        "SELECT follower_id FROM user_follower WHERE follower_user_id = @you AND user_id = @him"
      );
    const id = result.recordset[0] || 0;
    res.status(200).json({
      state: id,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function userProfile(req, res) {
  const id = req.body.id;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        `SELECT
        u.user_id,
        u.full_name,
        u.username,
        u.biography,
        u.profile_picture_src,
        COALESCE(p.total_posts, 0) AS total_posts,
        COUNT(DISTINCT uf1.follower_user_id) AS followers_count,
        COUNT(DISTINCT uf2.user_id) AS following_count
        FROM [user] u
        LEFT JOIN (
        SELECT user_id, COUNT(*) AS total_posts
        FROM post
        GROUP BY user_id
        ) p ON u.user_id = p.user_id
        LEFT JOIN user_follower uf1 ON u.user_id = uf1.user_id
        LEFT JOIN user_follower uf2 ON u.user_id = uf2.follower_user_id
        WHERE u.user_id = @id
        GROUP BY
        u.user_id,
        u.full_name,
        u.username,
        u.biography,
        u.profile_picture_src,
        p.total_posts;`
      );

    if (result.recordset.length === 0) {
      res.status(404).json({
        message: "User not found!",
      });
    } else {
      // Fetching all user posts with their first file_src
      const result2 = await pool
        .request()
        .input("id", sql.Int, id)
        .query(
          `SELECT
          p.post_id,
          p.like_count,
          p.comment_count,
          pf.post_file_id AS first_post_file_id,
          pf.file_src AS first_file_src
          FROM post p
          LEFT JOIN (
          SELECT
            post_id,
            post_file_id,
            file_src,
            ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY post_file_id) AS rn
          FROM post_file
        ) pf ON p.post_id = pf.post_id AND pf.rn = 1
        WHERE p.user_id = @id;
        `
        );
      const user = result.recordset[0];
      const posts = result2.recordset;
      res.status(200).json({
        user: user,
        blog: posts,
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function follow(req, res) {
  const { you, him } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("you", sql.Int, you)
      .input("him", sql.Int, him)
      .query(
        "INSERT INTO user_follower(user_id, follower_user_id) VALUES(@him, @you)"
      );

    res.status(201).json({
      message: "Successfully followed.",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function unfollow(req, res) {
  const { you, him } = req.params;
  try {
    const pool = await db;

    const result = await pool
      .request()
      .input("you", sql.Int, you)
      .input("him", sql.Int, him)
      .query(
        "DELETE FROM user_follower WHERE user_id = @him AND follower_user_id = @you"
      );

    res.status(204).json({
      message: "You unfollowed user.",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function getNotifications(req, res) {
  const id = req.body.id;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT COUNT(notification_id) AS total_notifications FROM notification WHERE user_id = @id AND is_read = 0"
      );
    const total = result.recordset[0].total_notifications;
    if (result.recordset[0].total_notifications > 0) {
      const result2 = await pool
        .request()
        .input("id", sql.Int, id)
        .query(
          `SELECT notification_id, notification_text, notification_date
        FROM notification
        WHERE user_id = @id AND is_read = 0`
        );

      const all_notifications = result2.recordset;
      res.status(200).json({
        total,
        all_notifications: all_notifications,
      });
    } else {
      res.status(200).json({
        total,
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function readNotificaton(req, res) {
  const id = req.body.id;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE notification SET is_read = 1 WHERE notification_id = @id");

    res.status(201).json({
      message: "Successfully read!",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function reportReasons(req, res) {
  try {
    const pool = await db;
    const result = await pool.query("SELECT * FROM report_reason");
    const reasons = result.recordset;
    res.status(200).json(reasons);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function sendReport(req, res) {
  const { you, him, report } = req.body;
  let { reason, report_data } = report;
  if (report_data === "") report_data = null;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("you", sql.Int, you)
      .input("him", sql.Int, him)
      .input("reason", sql.Int, reason)
      .input("text", sql.NVarChar, report_data)
      .query(
        "INSERT INTO report(reporter_id, reported_user_id, report_reason_id, report_text) VALUES(@you, @him, @reason, @text)"
      );

    res.status(201).json({
      message: "You have successfully reported user.",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function imagePublish(req, res) {
  const { description, id } = req.body;

  const uploadedFiles = req.files;

  const resizedImages = [];
  const imagesTypes = [];

  try {
    for (const file of uploadedFiles) {
      const resizedImageBuffer = await sharp(file.buffer)
        .resize(600, 900, { fit: sharp.fit.inside })
        .jpeg({ quality: 80 })
        .toBuffer();

      const timestamp = Date.now();
      const newFilename = `${timestamp}.jpg`;
      const newFilePath = `./assets/img/uploads/${newFilename}`;
      await sharp(resizedImageBuffer).toFile(newFilePath);

      resizedImages.push(newFilename);

      // Image type
      const imageMetadata = await sharp(file.buffer).metadata();
      const imageExtension = imageMetadata.format;
      imagesTypes.push(imageExtension);
    }

    // saving in database
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("desc", sql.NVarChar, description)
      .query(
        "INSERT INTO post(user_id, post_description) OUTPUT INSERTED.post_id VALUES(@id, @desc)"
      );
    const post = result.recordset[0].post_id;

    const values = [];
    for (let i = 0; i < resizedImages.length; i++) {
      values.push([resizedImages[i], imagesTypes[i], post]);
    }

    // Construct the SQL query with multiple VALUES
    let query = "INSERT INTO post_file(file_src, file_type, post_id) VALUES ";
    const valueStrings = values
      .map((value) => `('${value[0]}', '${value[1]}', ${value[2]})`)
      .join(", ");
    query += valueStrings;

    const result2 = await pool.query(query);

    res.status(201).json({
      message: "Successfully posted images.",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function profilePicture(req, res) {
  const { id } = req.body;

  const file = req.file;
  let resizedImage;

  try {
    const resizedImageBuffer = await sharp(file.buffer)
      .resize(200, 200, { fit: sharp.fit.cover })
      .jpeg({ quality: 80 })
      .toBuffer();

    const timestamp = Date.now();
    const newFilename = `${timestamp}.jpg`;
    const newFilePath = `./assets/img/uploads/userPictures/${newFilename}`;
    await sharp(resizedImageBuffer).toFile(newFilePath);
    resizedImage = newFilename;

    // saving in database
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("picture", sql.NVarChar, resizedImage)
      .query(
        "UPDATE [user] SET profile_picture_src = @picture WHERE user_id = @id"
      );

    res.status(200).json({
      picture: resizedImage,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function findConversations(req, res) {
  const { id, name, search } = req.body;
  try {
    let pulledResults;
    const pool = await db;
    if (search === "users") {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("val", sql.NVarChar, `%${name}%`).query(`
        SELECT u.user_id, u.username, u.profile_picture_src
        FROM [user] u
        INNER JOIN user_follower uf ON u.user_id = uf.user_id
        WHERE uf.follower_user_id = @id AND u.username LIKE @val;`);

      pulledResults = result.recordset;
    } else if (search === "groups") {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("val", sql.NVarChar, `%${name}%`).query(`
        SELECT g.group_id, g.group_name, g.group_image_src
        FROM [group] g
        INNER JOIN group_member gm ON g.group_id = gm.group_id
        WHERE gm.user_id = @id AND g.group_name LIKE @val;`);

      pulledResults = result.recordset;
    }

    res.status(200).json(pulledResults);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

module.exports = {
  signin,
  regions,
  countries,
  signup,
  searchPeople,
  isFollowing,
  userProfile,
  follow,
  unfollow,
  getNotifications,
  readNotificaton,
  reportReasons,
  sendReport,
  imagePublish,
  profilePicture,
  findConversations,
};
