require("dotenv").config();
// const MovieModel = require("../../models/movie.model");
// const UserModel = require("../../models/user.model");

const ProductController = require("./product.controller");
const PetController = require("./pet.controller");
const CategoryController = require("./category.controller");
const ItemController = require("./item.controller");
const UserController = require("./user.controller");

module.exports = {
    ProductController,
    PetController,
    CategoryController,
    ItemController,
    UserController,
}