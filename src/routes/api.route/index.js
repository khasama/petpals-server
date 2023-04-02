const express = require("express");
const router = express.Router();
const ProductRoute = require("./product.route");
const PetRoute = require("./pet.route");
const CategoryRoute = require("./category.route");
const ItemRoute = require("./item.route");
const AuthRoute = require("./auth.route");

router.use("/product", ProductRoute);
router.use("/pet", PetRoute);
router.use("/category", CategoryRoute);
router.use("/item", ItemRoute);
router.use("/auth", AuthRoute);
// router.use("/user", UserRoute);

module.exports = router;
