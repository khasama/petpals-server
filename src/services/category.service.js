const CategoryModel = require("../models/category.model");
const SubcategoryModel = require("../models/subcategory.model");

const CategoryService = {};

CategoryService.getAllCategory = async () => {
    try {
        const data = [];
        const categories = JSON.parse(JSON.stringify(await CategoryModel.find()));
        for (const category of categories) {
            const subcategory = JSON.parse(JSON.stringify(await SubcategoryModel.find({ category: category._id })));
            data.push({ ...category, subcategory });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

CategoryService.getCategory = async (_id) => {
    try {
        const category = JSON.parse(JSON.stringify(await CategoryModel.findById({ _id })));
        const subcategory = JSON.parse(JSON.stringify(await SubcategoryModel.find({ category: category._id })));
        return { ...category, subcategory };;
    } catch (error) {
        throw error;
    }
};

module.exports = CategoryService;
