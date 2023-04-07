const express = require("express");
const router = express.Router();
const { CartController } = require("../../controllers/api.controller");

router.post("/add", CartController.addCart);
router.post("/update", CartController.updateCart);
router.post("/get", CartController.getCart);

module.exports = router;