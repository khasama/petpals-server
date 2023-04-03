const express = require("express");
const router = express.Router();

const adminRoute = require("./admin.route");
const apiRoute = require("./api.route");
const mediaRoute = require("./media.route");

const { verifyAdmin } = require("../middlewares");

const { AdminController } = require("../controllers/admin.controller");

router.use("/admin", verifyAdmin(2), adminRoute);
router.use("/media", mediaRoute);
router.get("/login", AdminController.loginPage);
router.use("/api/v1", apiRoute);

module.exports = router;
