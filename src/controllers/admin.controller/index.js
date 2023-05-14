const CategoryController = require("./category.controller");
const ItemController = require("./item.controller");
const ProductController = require("./product.controller");
const PetController = require("./pet.controller");
const UserController = require("./user.controller");
const OrderController = require("./order.controller");

const AdminController = {};

AdminController.dashboard = async (req, res) => {
    try {

        return res.render("admin", { domain: global.domain });
    } catch (error) {
    }
};

AdminController.loginPage = async (req, res) => {
    try {
        if (req.session.user) return res.redirect('/admin');
        return res.render("admin/login", { domain: global.domain });
    } catch (error) {
    }
};

module.exports = {
    CategoryController,
    ItemController,
    ProductController,
    PetController,
    UserController,
    OrderController,
    AdminController,
}