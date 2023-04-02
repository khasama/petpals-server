const createError = require("http-errors");
const PetService = require("../../services/pet.service");

const PetController = {};

// PetController.getAllProduct = async (req, res, next) => {
//     try {
//         // const products = await ProductService.getAllProduct();
//         // return res.status(200).json({ status: "success", data: products });
//     } catch (error) {
//         return res.status(200).json({ status: "error", message: error.message });
//     }
// };
PetController.getPet = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const pet = await PetService.getPet(id);
            if (pet) return res.status(200).json({ status: "success", data: pet });
        }
        return res.status(200).json({ status: "error", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

PetController.addPet = async (req, res, next) => {
    try {
        const { name, price, description, category, subcategory, idUser } = req.body;
        const images = req.files;
        if (name && price && description && category && subcategory && images && idUser) {
            const result = await PetService.addPet(name, price, description, category, subcategory, images, idUser);
            if (result) {
                return res.status(200).json({ status: "success" });
            }
            return res.status(200).json({ status: "failed", message: 'Something wrong !!' });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};
PetController.updatePet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, price, description, category, subcategory, idUser } = req.body;
        const images = req.files;
        if (id && name && price && description && category && subcategory && images && idUser) {
            const result = await PetService.updatePet(id, name, price, description, category, subcategory, images, idUser);
            if (result) {
                return res.status(200).json({ status: "success" });
            }
            return res.status(200).json({ status: "failed", message: 'Something wrong !!' });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

module.exports = PetController;