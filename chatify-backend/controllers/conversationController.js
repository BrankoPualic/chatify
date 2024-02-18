const sql = require("mssql/msnodesqlv8");
const sharp = require("sharp");
const db = require("../db").connection;

async function getConversation(req, res) {
  let sender, recipient, group, offset;
  if (Object.hasOwn(req.body, "him")) {
    sender = req.body.me;
    recipient = req.body.him;
  } else if (Object.hasOwn(req.body, "group")) {
    sender = req.body.me;
    group = req.body.group;
  }
  offset = req.body.offset;
  try {
    const pool = await db;
    let messages;
    if (sender && recipient && group === undefined) {
      const result = await pool
        .request()
        .input("sender", sql.Int, sender)
        .input("recipient", sql.Int, recipient)
        .input("offset", sql.Int, offset).query(`
        SELECT m.message_id, m.sender_id, m.message_text, m.message_date, u.username, u.profile_picture_src
        FROM [message] m
        INNER JOIN [user] u ON m.sender_id = u.user_id
        WHERE (m.sender_id = @sender AND m.recipient_id = @recipient)
          OR (m.sender_id = @recipient AND m.recipient_id = @sender)
        ORDER BY m.message_date DESC
        OFFSET @offset ROWS FETCH NEXT 20 ROWS ONLY;`);

      messages = result.recordset;
      res.status(200).json(messages);
    } else if (sender && group && recipient === undefined) {
      const result = await pool
        .request()
        .input("group", sql.Int, group)
        .input("offset", sql.Int, offset).query(`
      SELECT m.message_id, m.sender_id, m.message_text, m.message_date, u.username, u.profile_picture_src
      FROM group_message m
      INNER JOIN [user] u ON m.sender_id = u.user_id
      WHERE m.group_id = @group
      ORDER BY m.message_date DESC
      OFFSET @offset ROWS FETCH NEXT 20 ROWS ONLY;`);

      messages = result.recordset;

      const myRole = await pool
        .request()
        .input("me", sql.Int, sender)
        .input("group", sql.Int, group).query(`
      SELECT gp.*
      FROM group_role gp JOIN group_member gm ON gp.group_role_id = gm.group_role_id
      WHERE gm.user_id = @me AND gm.group_id = @group`);

      sendingPackage = {
        messages,
        myRole: myRole.recordset[0],
      };
      res.status(200).json(sendingPackage);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function saveMessage(req, res) {
  let sender, recipient, group;
  const message = req.body.message;
  if (Object.hasOwn(req.body, "him")) {
    sender = req.body.me;
    recipient = req.body.him;
  } else if (Object.hasOwn(req.body, "group")) {
    sender = req.body.me;
    group = req.body.group;
  }

  try {
    let newMessageId, newMessage;
    const pool = await db;
    if (sender && recipient && group === undefined) {
      const result = await pool
        .request()
        .input("sender", sql.Int, sender)
        .input("recipient", sql.Int, recipient)
        .input("msg", sql.NVarChar, message).query(`
        DECLARE @InsertedMessage TABLE (message_id INT)
            INSERT INTO [message](sender_id, recipient_id, message_text)
            OUTPUT INSERTED.message_id INTO @InsertedMessage
            VALUES(@sender, @recipient, @msg);
            SELECT message_id FROM @InsertedMessage`);

      newMessageId = result.recordset[0].message_id;
      newMessage = await pool.request().input("id", sql.Int, newMessageId)
        .query(`SELECT m.message_id, m.sender_id, m.message_text, m.message_date, u.username, u.profile_picture_src
        FROM [message] m
        INNER JOIN [user] u ON m.sender_id = u.user_id
        WHERE m.message_id = @id;`);
      newMessage = newMessage.recordset[0];
    } else if (sender && group && recipient === undefined) {
      const result = await pool
        .request()
        .input("sender", sql.Int, sender)
        .input("group", sql.Int, group)
        .input("msg", sql.NVarChar, message).query(`
        DECLARE @InsertedMessage TABLE (message_id INT)
            INSERT INTO group_message(sender_id, group_id, message_text)
            OUTPUT INSERTED.message_id INTO @InsertedMessage
            VALUES(@sender, @group, @msg);
            SELECT message_id FROM @InsertedMessage`);
      newMessageId = result.recordset[0].message_id;
      newMessage = await pool.request().input("id", sql.Int, newMessageId)
        .query(`SELECT m.message_id, m.sender_id, m.message_text, m.message_date, u.username, u.profile_picture_src
        FROM group_message m
        INNER JOIN [user] u ON m.sender_id = u.user_id
        WHERE m.message_id = @id;`);
      newMessage = newMessage.recordset[0];
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function getExistingConversations(req, res) {
  const { id } = req.body;
  try {
    const pool = await db;
    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT
        mc.conversation_id,
        CASE
            WHEN mc.user1_id = @id THEN u2.user_id
            ELSE u1.user_id
        END AS user_id,
        CASE
            WHEN mc.user1_id = @id THEN u2.username
            ELSE u1.username
        END AS username,
        CASE
            WHEN mc.user1_id = @id THEN u2.profile_picture_src
            ELSE u1.profile_picture_src
        END AS profile_picture_src,
        mc.last_message_date
    FROM
        message_conversation mc
    JOIN
        [user] u1 ON mc.user1_id = u1.user_id
    JOIN
        [user] u2 ON mc.user2_id = u2.user_id
    WHERE
        mc.user1_id = @id

    UNION

    SELECT
        mc.conversation_id,
        CASE
            WHEN mc.user1_id = @id THEN u2.user_id
            ELSE u1.user_id
        END AS user_id,
        CASE
            WHEN mc.user1_id = @id THEN u2.username
            ELSE u1.username
        END AS username,
        CASE
            WHEN mc.user1_id = @id THEN u2.profile_picture_src
            ELSE u1.profile_picture_src
        END AS profile_picture_src,
        mc.last_message_date
    FROM
        message_conversation mc
    JOIN
        [user] u1 ON mc.user1_id = u1.user_id
    JOIN
        [user] u2 ON mc.user2_id = u2.user_id
    WHERE
        mc.user2_id = @id;`);

    const conversations = result.recordset;
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function getExistingGroupConversations(req, res) {
  const { id } = req.body;
  try {
    const pool = await db;
    const result = await pool.request().input("id", sql.Int, id).query(`
    SELECT
    g.group_name,
    g.group_image_src,
    g.group_id,
    COALESCE(gc.last_message_date, NULL) AS last_message_date,
    gc.conversation_id
    FROM [group] g
    LEFT JOIN group_conversation gc ON g.group_id = gc.group_id
    INNER JOIN group_member gm ON g.group_id = gm.group_id
    WHERE gm.user_id = @id;`);

    const conversations = result.recordset;
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function createGroup(req, res) {
  const { name, desc, user_ids } = req.body;

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

    // saving in databse
    const pool = await db;
    const createGroup = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("desc", sql.NVarChar, desc)
      .input("image", sql.NVarChar, resizedImage).query(`
    INSERT INTO [group](group_name, description, group_image_src) 
    OUTPUT INSERTED.group_id 
    VALUES(@name, @desc, @image)`);
    const gid = createGroup.recordset[0].group_id;

    // Insert group members
    const creatorUserId = user_ids[0];
    const memberUserIds = user_ids.slice(1); // Exclude the creator

    // Generate the value strings for the member user IDs with role_id 3
    const memberValueStrings = memberUserIds
      .map((userId) => `(${userId}, @group, 3)`)
      .join(", ");

    // Construct the complete query
    const query = `INSERT INTO group_member(user_id, group_id, group_role_id) VALUES
      (${creatorUserId}, @group, 1), ${memberValueStrings}`;

    const result = await pool
      .request()
      .input("group", sql.Int, gid)
      .query(query);

    res.status(201).json({
      message: "You have successfully created group!",
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

module.exports = {
  getConversation,
  saveMessage,
  getExistingConversations,
  getExistingGroupConversations,
  createGroup,
};
