const createError = require("http-errors");
const CheckoutService = require("../../services/checkout.service");

const CheckoutController = {};

CheckoutController.checkout = async (req, res, next) => {
    try {
        const { idUser, paymentMethod, fullName, email, address, phone } = req.body;
        if (idUser && paymentMethod) {
            const data = await CheckoutService.checkout(idUser, parseInt(paymentMethod), fullName, email, address, phone);
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = CheckoutController;