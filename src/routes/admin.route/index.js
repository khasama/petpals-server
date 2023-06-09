const express = require("express");
const router = express.Router();
const ProductRoute = require("./product.route");
const PetRoute = require("./pet.route");
const CategoryRoute = require("./category.route");
const ItemRoute = require("./item.route");
const UserRoute = require("./user.route");
const OrderRoute = require("./order.route");

const { AdminController } = require("../../controllers/admin.controller");

router.use("/product", ProductRoute);
router.use("/pet", PetRoute);
router.use("/category", CategoryRoute);
router.use("/item", ItemRoute);
router.use("/user", UserRoute);
router.use("/order", OrderRoute);

router.get("/", AdminController.dashboard);

module.exports = router;
