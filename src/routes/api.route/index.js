const express = require("express");
const router = express.Router();
const ProductRoute = require("./product.route");
const PetRoute = require("./pet.route");
const CategoryRoute = require("./category.route");
const ItemRoute = require("./item.route");
const AuthRoute = require("./auth.route");
const CartRoute = require("./cart.route");
const CheckoutRoute = require("./checkout.route");

const { verifyUser } = require("../../middlewares");

router.use("/product", ProductRoute);
router.use("/pet", PetRoute);
router.use("/category", CategoryRoute);
router.use("/item", ItemRoute);
router.use("/auth", AuthRoute);
router.use("/cart", verifyUser, CartRoute);
router.use("/checkout", verifyUser, CheckoutRoute);

module.exports = router;
