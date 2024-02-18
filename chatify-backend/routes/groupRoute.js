const express = require("express");
const groupController = require("../controllers/groupController");
const upload = require("../multerConfig");

const router = express.Router();

router.route("/").post(groupController.getGroupInformations);
router
  .route("/updateAll")
  .post(upload.single("file"), groupController.updateGroup);
router.route("/updateInfo").post(groupController.updateGroupInfo);
router.route("/findFriends").post(groupController.findFriends);
router.route("/addMember").post(groupController.addMember);
router.route("/otherRoles").post(groupController.otherRoles);
router.route("/updateRole").post(groupController.updateRole);
router.route("/remove/uid=:uid&gid=:gid").delete(groupController.removeMember);

module.exports = router;
