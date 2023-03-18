const createError = require("http-errors");
const ProductService = require("../../services/product.service");

const ProductController = {};

ProductController.getAllProd = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProd();
        return res.status(200).json({ status: "success", data: products });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};
ProductController.getProd = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductService.getProd(id);
        return res.status(200).json({ status: "success", data: product });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

module.exports = ProductController;