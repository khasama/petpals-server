const express = require("express");
const router = express.Router();
const { OrderController } = require("../../controllers/admin.controller");

router.get("/", OrderController.orderPage);

module.exports = router;