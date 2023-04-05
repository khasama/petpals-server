const UserModel = require("../../models/user.model");

const UserController = {};

UserController.userPage = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        return res.render("admin/pages/user", { users, domain: global.domain });
    } catch (error) {
    }
};

module.exports = UserController;