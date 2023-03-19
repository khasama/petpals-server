const express = require("express");
const router = express.Router();
const { CategoryController } = require("../../controllers/admin.controller");

router.delete("/sub/:id", CategoryController.deleteSubcategory);
router.post("/sub/:id", CategoryController.addSubcategory);
router.post("/", CategoryController.addCategory);
router.get("/", CategoryController.categoryPage);

module.exports = router;