const express = require("express");
const CategoriesController = require("../Controller/Categories.controller");
const router = express.Router();

router.get("/", CategoriesController.getAllCategories);

module.exports = router;
