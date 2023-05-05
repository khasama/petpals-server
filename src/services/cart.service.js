const CartModel = require("../models/cart.model");

const CartService = {};

CartService.addCart = async (idUser, idProduct, quantity) => {
    try {
        const cart = await CartModel.findOne({ user: idUser }).lean();
        if (cart) {
            let products = cart.products;
            const i = products.findIndex(e => e.product === idProduct);
            if (i > -1) {
                products[i].quantity = products[i].quantity + quantity;
            } else {
                products.push({
                    product: idProduct,
                    quantity
                });
            }
            await CartModel.findOneAndUpdate({ user: idUser }, { products });
        } else {
            const newCart = new CartModel({
                user: idUser,
                products: [{
                    product: idProduct,
                    quantity
                }]
            });
            await newCart.save();
        }
        let cartDetail = await CartModel.findOne({ user: idUser }).populate('products.product').lean();
        cartDetail = cartDetail.products.map(p => {
            return {
                product: { ...p.product, ...{ thumb: `${global.domain}media/image/${p.product.images[0]}` } },
                quantity: p.quantity
            };
        });
        return cartDetail;
    } catch (error) {
        throw error;
    }
};

CartService.updateCart = async (idUser, idProduct, quantity) => {
    try {
        const cart = await CartModel.findOne({ user: idUser }).lean();
        if (cart) {
            let products = cart.products;
            const i = products.findIndex(e => e.product === idProduct);
            if (quantity > 1) {
                products[i].quantity = quantity;
            } else {
                products.splice(i, 1);
            }
            await CartModel.findOneAndUpdate({ user: idUser }, { products });
            let cartDetail = await CartModel.findOne({ user: idUser }).populate('products.product').lean();
            cartDetail = cartDetail.products.map(p => {
                return {
                    product: { ...p.product, ...{ thumb: `${global.domain}media/image/${p.product.images[0]}` } },
                    quantity: p.quantity
                };
            });
            return cartDetail;
        } else {
            throw new Error("Not found cart !!");
        }
    } catch (error) {
        throw error;
    }
};

CartService.getCart = async (idUser) => {
    try {
        let cart = await CartModel.findOne({ user: idUser }).populate('products.product').lean();
        if (cart) {
            cart = cart.products.map(p => {
                return {
                    product: { ...p.product, ...{ thumb: `${global.domain}media/image/${p.product.images[0]}` } },
                    quantity: p.quantity
                };
            });
            return cart;
        }
        return [];
    } catch (error) {
        throw error;
    }
};

module.exports = CartService;
