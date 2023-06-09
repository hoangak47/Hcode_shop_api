const express = require("express");
const LoginControlller = require("../Controller/Login.controlller");
const router = express.Router();

router.post("/", LoginControlller.login);

module.exports = router;
