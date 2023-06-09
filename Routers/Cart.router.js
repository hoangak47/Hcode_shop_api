const express = require("express");
const router = express.Router();

const CartController = require("../Controller/Cart.controller");

router.get("/", CartController.getCart);

router.post("/", CartController.addToCart);

router.delete("/:id", CartController.deleteCart);

router.put("/:id", CartController.updateCart);

module.exports = router;
