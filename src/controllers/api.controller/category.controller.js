const createError = require("http-errors");
const CategoryService = require("../../services/category.service");

const CategoryController = {};

CategoryController.getAllCategory = async (req, res, next) => {
    try {
        const data = await CategoryService.getAllCategory();
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};
CategoryController.getCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await CategoryService.getCategory(id);
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

module.exports = CategoryController;