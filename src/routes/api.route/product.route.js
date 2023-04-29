const express = require("express");
const router = express.Router();
const { ProductController } = require("../../controllers/api.controller");

router.get("/recommend/:id", ProductController.getRecommendProducts);
router.get("/:id", ProductController.getProduct);
router.get("/", ProductController.getAllProduct);

module.exports = router;