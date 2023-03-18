const express = require("express");
const router = express.Router();
const { PetController } = require("../../controllers/api.controller");

router.get("/:id", PetController.getPet);
router.get("/", PetController.getAllPet);

module.exports = router;