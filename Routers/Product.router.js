const express = require("express");
const router = express.Router();

const productController = require("../Controller/Product.controller");

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getDetailProduct);

module.exports = router;
