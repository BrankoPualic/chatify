const express = require("express");
const userController = require("../controllers/userController");
const upload = require("../multerConfig");

const router = express.Router();

router.route("/signin").post(userController.signin);
router.route("/regions").get(userController.regions);
router.route("/countries").post(userController.countries);
router.route("/signup").post(userController.signup);
router.route("/search").post(userController.searchPeople);
router.route("/follow/check").post(userController.isFollowing);
router.route("/profile").post(userController.userProfile);
router.route("/follow").post(userController.follow);
router.route("/unfollow/you=:you&him=:him").delete(userController.unfollow);
router.route("/notifications").post(userController.getNotifications);
router.route("/readNotification").patch(userController.readNotificaton);
router.route("/reportReasons").get(userController.reportReasons);
router.route("/report").post(userController.sendReport);
router
  .route("/imagePublish")
  .post(upload.array("files", 12), userController.imagePublish);
router
  .route("/profilePicture")
  .post(upload.single("file"), userController.profilePicture);
router.route("/conversations").post(userController.findConversations);

module.exports = router;
