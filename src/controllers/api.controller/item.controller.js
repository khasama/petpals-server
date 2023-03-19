const createError = require("http-errors");
const ItemService = require("../../services/item.service");

const ItemController = {};

ItemController.getAllItem = async (req, res, next) => {
    try {
        const data = await ItemService.getAllItem();
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};
ItemController.getItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await ItemService.getItem(id);
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(200).json({ status: "error", message: error.message });
    }
};

module.exports = ItemController;