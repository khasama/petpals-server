const express = require("express");
const router = express.Router();
const { ItemController } = require("../../controllers/api.controller");

router.get("/:id", ItemController.getItem);
router.get("/", ItemController.getAllItem);

module.exports = router;