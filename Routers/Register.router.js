const express = require("express");
const RegisterController = require("../Controller/Register.controller");
const router = express.Router();

router.post("/", RegisterController.register);

module.exports = router;
