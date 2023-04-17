const express = require("express");
const router = express.Router();
const { PetController } = require("../../controllers/api.controller");

const { verifyUser } = require("../../middlewares");

router.get("/:id", verifyUser, PetController.getPet);
router.put("/:id", verifyUser, PetController.updatePet);
router.post("/", PetController.addPet);
router.get("/", PetController.getAllPet);

module.exports = router;