const createError = require("http-errors");
const ProductService = require("../../services/product.service");

const ProductController = {};

ProductController.getAllProduct = async (req, res, next) => {
    try {
        const query = req.query;
        const products = await ProductService.getAllProduct(query);
        return res.status(200).json({ status: "success", data: products });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};
ProductController.getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const product = await ProductService.getProduct(id);
            return res.status(200).json({ status: "success", data: product });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = ProductController;