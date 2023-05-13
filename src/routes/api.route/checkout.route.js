const express = require("express");
const router = express.Router();
const { CheckoutController } = require("../../controllers/api.controller");

const { verifyUser } = require("../../middlewares");

router.post("/", CheckoutController.checkout);
router.get("/my-order/:id", verifyUser, CheckoutController.getMyOrders);

module.exports = router;