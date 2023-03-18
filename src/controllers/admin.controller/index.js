require("dotenv").config();
// const MovieModel = require("../../models/movie.model");
// const UserModel = require("../../models/user.model");

const MovieController = require("./movie.controller");
const ServerController = require("./server.controller");
const EpisodeController = require("./episode.controller");
const LinkController = require("./link.controller");
const UserController = require("./user.controller");
const ToolController = require("./tool.controller");

const AdminController = {};

AdminController.dashboard = async (req, res) => {
    try {
        // const movies = await MovieModel.find({});
        // const users = await UserModel.find({});
        // return res.render("admin", { movie: movies.length, user: users.length, domain: global.domain });
    } catch (error) {
        // logger.error(error.stack || error);
    }
};

module.exports = {
    MovieController,
    ServerController,
    EpisodeController,
    LinkController,
    UserController,
    ToolController,
    AdminController,
}