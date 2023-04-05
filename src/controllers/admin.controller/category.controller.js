const createError = require("http-errors");
const CategoryModel = require("../../models/category.model");
const SubcategoryModel = require("../../models/subcategory.model");
const slug = require("slug");

const CategoryController = {};

CategoryController.categoryPage = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        return res.render("admin/pages/category", { categories, domain: global.domain });
    } catch (error) {
    }
};

CategoryController.addCategory = async (req, res, next) => {
    try {
        const { category } = req.body;
        if (category) {
            const newCategory = new CategoryModel({ name: category, slug: slug(category) });
            await newCategory.save();
            return res.status(200).json({ status: "success" });
        }
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

CategoryController.addSubcategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { subcategory } = req.body;
        if (id && subcategory) {
            const newSubcategory = new SubcategoryModel({ name: subcategory, slug: slug(subcategory), category: id });
            await newSubcategory.save();
            const subcategories = await SubcategoryModel.find({ category: id });
            return res.status(200).json({ status: "success", data: subcategories });
        }
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

CategoryController.deleteSubcategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        await SubcategoryModel.findOneAndDelete({ _id: id });
        return res.status(200).json({ status: "success" });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = CategoryController;