const mongoose = require("mongoose");
const ItemModel = require("../models/item.model");
const SubitemModel = require("../models/subitem.model");

const ItemService = {};

ItemService.getAllItem = async () => {
    try {
        const data = [];
        const items = await ItemModel.find();
        for (const item of items) {
            const subitem = await SubitemModel.find({ item: item._id });
            data.push({ ...JSON.parse(JSON.stringify(item)), subitem });
        }
        return data;
    } catch (error) {
        throw error;
    }
};

ItemService.getItem = async (_id) => {
    try {
        const item = await ItemModel.findById({ _id });
        const subitem = await SubitemModel.find({ item: item._id });
        return { ...JSON.parse(JSON.stringify(item)), subitem };;
    } catch (error) {
        throw error;
    }
};

module.exports = ItemService;
