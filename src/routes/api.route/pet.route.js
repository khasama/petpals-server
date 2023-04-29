const express = require("express");
const router = express.Router();
const { PetController } = require("../../controllers/api.controller");

const { verifyUser } = require("../../middlewares");

router.get("/recommend/:id", PetController.getRecommendPets);
router.get("/:id", PetController.getPet);
router.put("/:id", verifyUser, PetController.updatePet);
router.post("/", verifyUser, PetController.addPet);
router.get("/", PetController.getAllPet);

module.exports = router;