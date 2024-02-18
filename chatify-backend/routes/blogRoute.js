const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.route("/").post(blogController.getBlog);
router.route("/post").post(blogController.getPost);
router.route("/post/like").post(blogController.likePost);
router.route("/post/publishComment").post(blogController.insertComment);
router.route("/post/allComments").post(blogController.getComments);
router.route("/post/commentLike").post(blogController.likeComment);

module.exports = router;
