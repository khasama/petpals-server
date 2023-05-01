const CartModel = require("../models/cart.model");
const OrderModel = require("../models/order.model");

const CheckoutService = {};

CheckoutService.checkout = async (idUser, pM, fullName, email, address, phone) => {
    try {
        let total = 0, paymentMethod;
        if (pM == 0) paymentMethod = 'Thanh toán khi nhận hàng';
        if (pM == 1) paymentMethod = 'Momo';
        let cart = JSON.parse(JSON.stringify(await CartModel.findOne({ user: idUser }).populate('products.product')));
        cart = cart.products.map(p => {
            return {
                product: { ...p.product, ...{ thumb: `${global.domain}media/image/${p.product.images[0]}` } },
                quantity: p.quantity
            };
        });
        cart.map((e, i) => total += parseInt(e.quantity * e.product.price));
        const newOrder = new OrderModel({
            user: idUser,
            fullName,
            email,
            address,
            phone,
            products: cart,
            total,
            payment: paymentMethod
        });
        await newOrder.save();
        await CartModel.findOneAndUpdate({ user: idUser }, { products: [] });
        if (pM == 1) return newOrder._id;
        return;
    } catch (error) {
        throw error;
    }
};

module.exports = CheckoutService;
