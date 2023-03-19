const express = require("express");
const router = express.Router();
const { CategoryController } = require("../../controllers/api.controller");

router.get("/:id", CategoryController.getCategory);
router.get("/", CategoryController.getAllCategory);

module.exports = router;