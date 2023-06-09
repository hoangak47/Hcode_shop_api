const express = require("express");
const UserController = require("../Controller/User.controller");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello from user router");
});

router.post("/", UserController.updateUserInfo);

router.post("/change-password", UserController.changePassword);

module.exports = router;
