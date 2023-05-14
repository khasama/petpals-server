const OrderModel = require("../../models/order.model");

const OrderController = {};

OrderController.orderPage = async (req, res, next) => {
    try {
        const orders = await OrderModel.find().populate('products.product');
        return res.render("admin/pages/order", { orders, domain: global.domain });
    } catch (error) {
    }
};

module.exports = OrderController;