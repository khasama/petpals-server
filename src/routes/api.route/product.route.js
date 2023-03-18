const express = require("express");
const router = express.Router();
const { ProductController } = require("../../controllers/api.controller");

router.get("/:id", ProductController.getProd);
router.get("/", ProductController.getAllProd);

module.exports = router;