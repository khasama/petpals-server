const createError = require("http-errors");
const CartService = require("../../services/cart.service");

const CartController = {};

CartController.addCart = async (req, res, next) => {
    try {
        const { idUser, idProduct, quantity } = req.body;
        if (idUser && idProduct && quantity) {
            const data = await CartService.addCart(idUser, idProduct, parseInt(quantity));
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

CartController.updateCart = async (req, res, next) => {
    try {
        const { idUser, idProduct, quantity } = req.body;
        if (idUser && idProduct && quantity) {
            const data = await CartService.updateCart(idUser, idProduct, parseInt(quantity));
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

CartController.getCart = async (req, res, next) => {
    try {
        const { idUser } = req.params;
        if (idUser) {
            const data = await CartService.getCart(idUser);
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: 'Missing params' });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = CartController;