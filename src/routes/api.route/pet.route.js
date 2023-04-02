const express = require("express");
const router = express.Router();
const { PetController } = require("../../controllers/api.controller");

router.get("/:id", PetController.getPet);
router.put("/:id", PetController.updatePet);
router.post("/", PetController.addPet);
// router.get("/", PetController.getAllPet);

module.exports = router;