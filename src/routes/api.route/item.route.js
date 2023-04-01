const express = require("express");
const router = express.Router();
const { ItemController } = require("../../controllers/api.controller");

router.get("/product/:id", ItemController.getProductOfItem);
router.get("/:id", ItemController.getItem);
router.get("/", ItemController.getAllItem);

module.exports = router;