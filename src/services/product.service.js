const ProductModel = require("../models/product.model");

const ProductService = {};

ProductService.getAllProduct = async (query) => {
    try {
        let { page, limit, item, subitem } = query;
        let filter = { deleted: false };
        if (!page || page < 0) page = 1;
        if (!limit || limit < 0) limit = 20;
        if (item) filter = { ...filter, ...{ item } };
        if (subitem) filter = { ...filter, ...{ subitem } };
        let products = await ProductModel
            .find(filter)
            .sort({ 'createdAt': 'desc' })
            .limit(limit).skip((page - 1) * limit);
        products = JSON.parse(JSON.stringify(products));
        products = products.map(product => {
            return { ...product, ...{ thumb: `${global.domain}media/image/${product.images[0]}` } }
        });
        return products;
    } catch (error) {
        throw error;
    }
};

ProductService.getProduct = async (_id) => {
    try {
        const product = JSON.parse(JSON.stringify(
            await ProductModel.findById({ _id })
                .populate('item')
                .populate('subitem')
        ));
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

ProductService.getRecommendProducts = async (_id) => {
    try {
        const subitem = JSON.parse(JSON.stringify(await ProductModel.findById({ _id }))).subitem;
        let products = JSON.parse(JSON.stringify(
            await ProductModel.find({ subitem })
                .populate('item')
                .populate('subitem')
                .limit(10)
        ));
        products = products.filter(product => {
            if (product._id != _id) return { ...product, ...{ thumb: `${global.domain}media/image/${product.images[0]}` } }
        });
        return products;
    } catch (error) {
        throw error;
    }
};

module.exports = ProductService;
