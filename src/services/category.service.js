const CategoryModel = require("../models/category.model");
const SubcategoryModel = require("../models/subcategory.model");

const CategoryService = {};

CategoryService.getAllCategory = async () => {
    try {
        const data = [];
        const categories = await CategoryModel.find().lean();
        for (const category of categories) {
            const subcategory = await SubcategoryModel.find({ category: category._id }).lean();
            data.push({ ...category, subcategory });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

CategoryService.getCategory = async (_id) => {
    try {
        const category = await CategoryModel.findById({ _id }).lean();
        const subcategory = await SubcategoryModel.find({ category: category._id }).lean();
        return { ...category, subcategory };;
    } catch (error) {
        throw error;
    }
};

module.exports = CategoryService;
