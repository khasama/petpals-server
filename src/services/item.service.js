const ItemModel = require("../models/item.model");
const SubitemModel = require("../models/subitem.model");
const ProductModel = require("../models/product.model");

const ItemService = {};

ItemService.getAllItem = async () => {
    try {
        const data = [];
        const items = JSON.parse(JSON.stringify(await ItemModel.find()));
        for (const item of items) {
            const subitem = JSON.parse(JSON.stringify(await SubitemModel.find({ item: item._id })));
            data.push({ ...item, subitem });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

ItemService.getItem = async (_id) => {
    try {
        const item = JSON.parse(JSON.stringify(await ItemModel.findById({ _id })));
        const subitem = JSON.parse(JSON.stringify(await SubitemModel.find({ item: item._id })));
        return { ...item, subitem };
    } catch (error) {
        throw error;
    }
};

ItemService.getProductOfItem = async (_id, query) => {
    try {
        let { page, limit } = query;
        if (!page || page < 0) page = 1;
        if (!limit || limit < 0) limit = 20;
        let products = JSON.parse(
            JSON.stringify(
                await ProductModel
                    .find({ item: _id, deleted: false })
                    .limit(limit).skip((page - 1) * limit)
            )
        );
        products = products.map(product => {
            return { ...product, ...{ thumb: `${global.domain}media/image/${product.images[0]}` } }
        });
        return products;
    } catch (error) {
        throw error;
    }
};

module.exports = ItemService;
