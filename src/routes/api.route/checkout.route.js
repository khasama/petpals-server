const express = require("express");
const router = express.Router();
const { CheckoutController } = require("../../controllers/api.controller");

router.post("/", CheckoutController.checkout);

module.exports = router;