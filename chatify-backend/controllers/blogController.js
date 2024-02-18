const sql = require("mssql/msnodesqlv8");
const db = require("../db").connection;

async function getBlog(req, res) {
  const userId = req.body.id;
  try {
    const pool = await db;
    const result = await pool.request().input("id", sql.Int, userId).query(`
    SELECT TOP 10
    p.post_id,
    p.user_id,
    p.post_description,
    p.post_date,
    p.like_count,
    p.comment_count,
    (
        SELECT STRING_AGG(pf.file_src, ',') 
        FROM post_file pf 
        WHERE pf.post_id = p.post_id
    ) AS file_src_array,
    u.username AS post_username,
    u.profile_picture_src AS post_profile_picture,
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM love l
            WHERE l.post_id = p.post_id AND l.user_id = @id
        ) THEN 1
        ELSE 0
    END AS is_liked
    FROM post p
    INNER JOIN user_follower uf ON p.user_id = uf.user_id
    INNER JOIN [user] u ON p.user_id = u.user_id
    WHERE uf.follower_user_id = @id
    ORDER BY p.post_date DESC;
   `);
    if (result.recordset.length === 0) {
      res.status(404).json({
        message: "No posts are found!",
      });
    } else {
      const posts = result.recordset;
      res.json(posts);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function getPost(req, res) {
  const { user_id, post_id } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("uid", sql.Int, user_id)
      .input("pid", sql.Int, post_id).query(`
    SELECT
    p.post_id,
    p.user_id,
    p.post_description,
    p.post_date,
    p.like_count,
    p.comment_count,
    (
        SELECT STRING_AGG(pf.file_src, ',') 
        FROM post_file pf 
        WHERE pf.post_id = p.post_id
    ) AS file_src_array,
    u.username AS post_username,
    u.profile_picture_src AS post_profile_picture,
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM love l
            WHERE l.post_id = p.post_id AND l.user_id = @uid
        ) THEN 1
        ELSE 0
    END AS is_liked
    FROM post p
    INNER JOIN [user] u ON p.user_id = u.user_id
    WHERE p.post_id = @pid
    ORDER BY p.post_date DESC;`);

    const post = result.recordset[0];
    res.status(200).json(post);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function likePost(req, res) {
  const { post_id, user_id } = req.body;
  try {
    const pool = await db;

    // We are looking if the user has already liked the post

    let status;

    const alreadyLiked = await pool
      .request()
      .input("pid", sql.Int, post_id)
      .input("uid", sql.Int, user_id)
      .query(`SELECT * FROM love WHERE user_id = @uid AND post_id = @pid`);

    if (alreadyLiked.recordset.length !== 0) {
      // Delete like from that post
      const deleteLike = await pool
        .request()
        .input("pid", sql.Int, post_id)
        .input("uid", sql.Int, user_id)
        .query(`DELETE FROM love WHERE user_id = @uid AND post_id = @pid`);

      status = 0;
    } else {
      // Like the post and return like count for that post
      const result = await pool
        .request()
        .input("pid", sql.Int, post_id)
        .input("uid", sql.Int, user_id).query(`
              INSERT INTO love(user_id, post_id) VALUES(@uid, @pid)
              `);
      status = 1;
    }
    const select = await pool
      .request()
      .input("pid", sql.Int, post_id)
      .query("SELECT like_count FROM post WHERE post_id = @pid");
    res.status(200).json({
      status: status,
      like_count: select.recordset[0].like_count,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function insertComment(req, res) {
  const { user_id, post_id, comment } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("uid", sql.Int, user_id)
      .input("pid", sql.Int, post_id)
      .input("comment", sql.NVarChar, comment)
      .query(
        `DECLARE @InsertedComment TABLE (comment_id INT);
        INSERT INTO comment(user_id, post_id, comment_text) 
        OUTPUT INSERTED.comment_id INTO @InsertedComment 
        VALUES(@uid, @pid, @comment);
        SELECT comment_id FROM @InsertedComment`
      );

    const newCommentId = result.recordset[0].comment_id;

    const newComment = await pool
      .request()
      .input("id", sql.Int, newCommentId)
      .query(
        "SELECT c.*, u.username, u.profile_picture_src FROM comment c JOIN [user] u ON c.user_id = u.user_id WHERE c.comment_id = @id"
      );

    const selectedComment = newComment.recordset[0];
    res.status(201).json({
      message: "Successfully added comment.",
      comment: selectedComment,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function getComments(req, res) {
  const { post_id } = req.body;
  try {
    const pool = await db;
    const result = await pool
      .request()
      .input("id", sql.Int, post_id)
      .query(
        "SELECT c.*, u.username, u.profile_picture_src FROM comment c JOIN [user] u ON c.user_id = u.user_id WHERE c.post_id = @id"
      );
    const comments = result.recordset;
    res.status(200).json({
      comments: comments,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

async function likeComment(req, res) {
  const { user_id, comment_id } = req.body;
  try {
    const pool = await db;

    // We are looking if the user has already liked the comment

    let status;

    const alreadyLiked = await pool
      .request()
      .input("cid", sql.Int, comment_id)
      .input("uid", sql.Int, user_id)
      .query(
        `SELECT * FROM comment_love WHERE user_id = @uid AND comment_id = @cid`
      );

    if (alreadyLiked.recordset.length !== 0) {
      // Delete like from that post
      const deleteComment = await pool
        .request()
        .input("cid", sql.Int, comment_id)
        .input("uid", sql.Int, user_id)
        .query(
          `DELETE FROM comment_love WHERE user_id = @uid AND comment_id = @cid`
        );
      status = 0;
    } else {
      // Like the comment and return like count for that comment
      const result = await pool
        .request()
        .input("cid", sql.Int, comment_id)
        .input("uid", sql.Int, user_id).query(`
              INSERT INTO comment_love(user_id, comment_id) VALUES(@uid, @cid)
              `);
      status = 1;
    }
    const select = await pool
      .request()
      .input("cid", sql.Int, comment_id)
      .query("SELECT like_count FROM comment WHERE comment_id = @cid");
    res.status(200).json({
      status: status,
      like_count: select.recordset[0].like_count,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

module.exports = {
  getBlog,
  likePost,
  insertComment,
  getComments,
  likeComment,
  getPost,
};
