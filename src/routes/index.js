const express = require("express");
const router = express.Router();

const adminRoute = require("./admin.route");
const apiRoute = require("./api.route");


router.use("/admin", adminRoute);
router.use("/api/v1", apiRoute);

module.exports = router;
