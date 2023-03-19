const mongoose = require("mongoose");
const CategoryModel = require("../models/category.model");
const SubcategoryModel = require("../models/subcategory.model");

const CategoryService = {};

CategoryService.getAllCategory = async () => {
    try {
        const data = [];
        const categories = await CategoryModel.find();
        for (const category of categories) {
            const subcategory = await SubcategoryModel.find({ category: category._id });
            data.push({ ...JSON.parse(JSON.stringify(category)), subcategory });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

CategoryService.getCategory = async (_id) => {
    try {
        const category = await CategoryModel.findById({ _id });
        const subcategory = await SubcategoryModel.find({ category: category._id });
        return { ...JSON.parse(JSON.stringify(category)), subcategory };;
    } catch (error) {
        throw error;
    }
};

module.exports = CategoryService;
