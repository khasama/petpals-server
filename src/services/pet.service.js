const mongoose = require("mongoose");
const PetModel = require("../models/pet.model");
const slug = require("slug");

const PetService = {};

PetService.getAllPet = async () => {
    try {
        const pets = await PetModel.findAll();
        return pets;
    } catch (error) {
        throw error;
    }
};

PetService.getPet = async (id) => {
    try {
        const pet = await PetModel.findById({ _id: mongoose.Types.ObjectId(id) });
        return pet;
    } catch (error) {
        throw error;
    }
};

module.exports = PetService;
