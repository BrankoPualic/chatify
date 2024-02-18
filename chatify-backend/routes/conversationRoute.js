const express = require("express");
const conversationController = require("../controllers/conversationController");
const upload = require("../multerConfig");

const router = express.Router();

router.route("/").post(conversationController.getConversation);
router.route("/messages").post(conversationController.saveMessage);
router
  .route("/conversations")
  .post(conversationController.getExistingConversations);
router
  .route("/groups")
  .post(conversationController.getExistingGroupConversations);
router
  .route("/createGroup")
  .post(upload.single("file"), conversationController.createGroup);

module.exports = router;
