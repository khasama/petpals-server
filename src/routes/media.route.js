const express = require("express");
const router = express.Router();
const MediaController = require("../controllers/media.controller");
// const { checkRefererEmbed } = require("../middlewares");

router.get("/image/:id", MediaController.streamImage);


module.exports = router;
