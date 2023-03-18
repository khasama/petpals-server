const express = require("express");
const router = express.Router();


router.use("/admin", adminRoute);
router.use("/api/v1", apiRoute);

module.exports = router;
