const express = require("express");
const router = express.Router();
const { CartController } = require("../../controllers/api.controller");

router.post("/add", CartController.addCart);
router.post("/update", CartController.updateCart);
router.get("/:idUser", CartController.getCart);

module.exports = router;