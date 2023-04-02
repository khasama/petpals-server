const ProductModel = require("../models/product.model");

const ProductService = {};

ProductService.getAllProduct = async () => {
    try {
        const products = await ProductModel.findAll();
        return products;
    } catch (error) {
        throw error;
    }
};

ProductService.getProduct = async (_id) => {
    try {
        const product = JSON.parse(JSON.stringify(await ProductModel.findById({ _id })));
        if (product) {
            let images = product.images;
            images = images.map(image => {
                return `${global.domain}media/image/${image}`;
            });
            return { ...product, ...{ images } };
        }
        throw new Error("Not found");
    } catch (error) {
        throw error;
    }
};

module.exports = ProductService;
