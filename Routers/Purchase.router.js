const express = require("express");
const router = express.Router();

const PurchaseController = require("../Controller/Purchase.controller");

router.get("/", PurchaseController.findAll);

router.post("/", PurchaseController.create);

router.get("/:id", PurchaseController.findOne);

router.put("/:id", PurchaseController.cancel);

module.exports = router;
