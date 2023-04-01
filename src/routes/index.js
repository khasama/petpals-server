const express = require("express");
const router = express.Router();

const adminRoute = require("./admin.route");
const apiRoute = require("./api.route");
const mediaRoute = require("./media.route");


router.use("/admin", adminRoute);
router.use("/media", mediaRoute);
router.use("/api/v1", apiRoute);

module.exports = router;
