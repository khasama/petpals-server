const express = require("express");
const router = express.Router();
const { AuthController } = require("../../controllers/api.controller");

router.get("/logout", AuthController.logout);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;