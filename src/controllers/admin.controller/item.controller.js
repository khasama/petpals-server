const createError = require("http-errors");
const ItemModel = require("../../models/item.model");
const SubitemModel = require("../../models/subitem.model");
const slug = require("slug");

const ItemController = {};

ItemController.itemPage = async (req, res, next) => {
    try {
        const items = await ItemModel.find();
        return res.render("admin/pages/item", { items, domain: global.domain });
    } catch (error) {
    }
};

ItemController.addItem = async (req, res, next) => {
    try {
        const { item } = req.body;
        if (item) {
            const newItem = new ItemModel({ name: item, slug: slug(item) });
            await newItem.save();
            return res.status(200).json({ status: "success" });
        }
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

ItemController.addSubitem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { subitem } = req.body;
        if (id && subitem) {
            const newSubitem = new SubitemModel({ name: subitem, slug: slug(subitem), item: id });
            await newSubitem.save();
            const subitems = await SubitemModel.find({ item: id });
            return res.status(200).json({ status: "success", data: subitems });
        }
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

ItemController.deleteSubitem = async (req, res, next) => {
    try {
        const id = req.params.id;
        await SubitemModel.findOneAndDelete({ _id: id });
        return res.status(200).json({ status: "success" });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

module.exports = ItemController;