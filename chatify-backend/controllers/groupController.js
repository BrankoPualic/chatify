const sql = require("mssql/msnodesqlv8");
const sharp = require("sharp");
const db = require("../db").connection;

async function getGroupInformations(req, res) {
  const { gid } = req.body;
  try {
    const pool = await db;
    const result = await pool.request().input("gid", sql.Int, gid).query(`
        SELECT        g.group_id, g.group_name, g.creation_date, g.description, g.group_image_src, COUNT(gm.group_member_id) AS member_count, gc.last_message_date
        FROM            [group] AS g INNER JOIN
                                group_conversation AS gc ON g.group_id = gc.group_id INNER JOIN
                                group_member AS gm ON g.group_id = gm.group_id
        WHERE        (g.group_id = @gid)
        GROUP BY gc.last_message_date, g.group_id, g.group_name, g.creation_date, g.description, g.group_image_src;`);
    const group = result.recordset[0];

    const result2 = await pool.request().input("gid", sql.Int, gid).query(`
        SELECT        gm.group_member_id, gm.user_id, u.full_name, u.username, u.profile_picture_src, gm.join_date, gr.name, gr.group_role_id
        FROM            group_member AS gm INNER JOIN
                                group_role AS gr ON gm.group_role_id = gr.group_role_id INNER JOIN
                                [user] AS u ON gm.user_id = u.user_id
        WHERE        (gm.group_id = @gid);`);
    const members = result2.recordset;

    res.status(200).json({
      group,
      members,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function updateGroup(req, res) {
  const { id, name, desc } = req.body;

  const file = req.file;
  let resizedImage;
  try {
    const resizedImageBuffer = await sharp(file.buffer)
      .flatten({ background: "#fff" })
      .resize(200, 200, { fit: sharp.fit.cover })
      .jpeg({ quality: 80 })
      .toBuffer();

    const timestamp = Date.now();
    const newFilename = `${timestamp}.jpg`;
    const newFilePath = `./assets/img/uploads/groupPictures/${newFilename}`;
    await sharp(resizedImageBuffer).toFile(newFilePath);
    resizedImage = newFilename;

    const pool = await db;
    const updateGroup = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("desc", sql.NVarChar, desc)
      .input("image", sql.NVarChar, resizedImage).query(`
    UPDATE [group]
    SET group_name = @name, description = @desc, group_image_src = @image
    OUTPUT INSERTED.group_name, INSERTED.description, INSERTED.group_image_src
    WHERE group_id = @id;`);

    const newGName = updateGroup.recordset[0].group_name;
    const newGDesc = updateGroup.recordset[0].description;
    const newGImage = updateGroup.recordset[0].group_image_src;

    res.status(200).json({
      group_name: newGName,
      description: newGDesc,
      group_image_src: newGImage,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function updateGroupInfo(req, res) {
  const { id, name, desc } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("desc", sql.NVarChar, desc).query(`
      UPDATE [group]
      SET group_name = @name, description = @desc
      OUTPUT INSERTED.group_name, INSERTED.description
      WHERE group_id = @id;`);

    const newGName = result.recordset[0].group_name;
    const newGDesc = result.recordset[0].description;

    res.status(200).json({
      group_name: newGName,
      description: newGDesc,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function findFriends(req, res) {
  const { id, group, value } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("gid", sql.Int, group)
      .input("name", sql.NVarChar, `%${value}%`).query(`
      SELECT DISTINCT u.user_id, u.full_name, u.username, u.profile_picture_src
      FROM [user] u
      JOIN user_follower uf ON u.user_id = uf.user_id OR u.user_id = uf.follower_user_id
      LEFT JOIN group_member gm ON u.user_id = gm.user_id AND gm.group_id = @gid
      WHERE u.user_id != @id
      AND (uf.user_id = @id OR uf.follower_user_id = @id)
      AND gm.group_member_id IS NULL
      AND (u.full_name LIKE @name OR u.username LIKE @name);
    `);

    const users = result.recordset;

    res.status(200).json(users);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function addMember(req, res) {
  const { user, group } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, user)
      .input("gid", sql.Int, group).query(`
    INSERT INTO group_member(user_id, group_id, group_role_id)
    VALUES(@id, @gid, 3);`);

    res.status(200).json({ message: "Successfull!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function otherRoles(req, res) {
  const { my_role } = req.body;
  try {
    const pool = await db;
    const result = await pool.request().input("role", sql.Int, my_role).query(`
    SELECT * FROM group_role
    WHERE group_role_id != @role;`);

    const roles = result.recordset;
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function updateRole(req, res) {
  const { id, role, group } = req.body;
  try {
    const pool = await db;
    await pool
      .request()
      .input("uid", sql.Int, id)
      .input("role", sql.Int, role)
      .input("gid", sql.Int, group).query(`
    UPDATE group_member
    SET group_role_id = @role
    WHERE user_id = @uid AND group_id = @gid;`);

    const result = await pool.request().input("role", sql.Int, role).query(`
    SELECT * FROM group_role WHERE group_role_id = @role;`);

    const changedRole = result.recordset[0];

    res.status(200).json(changedRole);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function removeMember(req, res) {
  const { uid, gid } = req.params;
  try {
    const pool = await db;
    await pool.request().input("uid", sql.Int, uid).input("gid", sql.Int, gid)
      .query(`
    DELETE FROM group_member
    WHERE user_id = @uid AND group_id = @gid;`);

    res.status(200).json({ message: "Successfull!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

module.exports = {
  getGroupInformations,
  updateGroup,
  updateGroupInfo,
  findFriends,
  addMember,
  otherRoles,
  updateRole,
  removeMember,
};
