require("dotenv").config();
// const MovieModel = require("../../models/movie.model");
// const UserModel = require("../../models/user.model");

const CategoryController = require("./category.controller");
const ItemController = require("./item.controller");
const ProductController = require("./product.controller");
// const EpisodeController = require("./episode.controller");
// const LinkController = require("./link.controller");
// const UserController = require("./user.controller");
// const ToolController = require("./tool.controller");

const AdminController = {};

AdminController.dashboard = async (req, res) => {
    try {

        return res.render("admin", { domain: global.domain });
    } catch (error) {
        // logger.error(error.stack || error);
    }
};

module.exports = {
    CategoryController,
    ItemController,
    ProductController,
    // LinkController,
    // UserController,
    // ToolController,
    AdminController,
}