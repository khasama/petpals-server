const mongoose = require("mongoose");
const ProductModel = require("../models/product.model");
const slug = require("slug");

const ProductService = {};

ProductService.getAllProd = async () => {
    try {
        const products = await ProductModel.findAll();
        return products;
    } catch (error) {
        throw error;
    }
};

ProductService.getProd = async (id) => {
    try {
        const product = await ProductModel.findById({ _id: mongoose.Types.ObjectId(id) });
        return product;
    } catch (error) {
        throw error;
    }
};

module.exports = ProductService;
