const createError = require("http-errors");
const AuthService = require("../../services/auth.service");

const AuthController = {};

AuthController.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const result = await AuthService.register(username, password);
            if (result) return res.status(200).json({ status: "success" });
            return res.status(200).json({ status: "failed", message: "Something wrong !!" });
        }
        return res.status(200).json({ status: "failed", message: "Missing params" });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

AuthController.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const data = await AuthService.login(username, password);
            req.session.access_token = data.accessToken;
            req.session.user = data;
            return res.status(200).json({ status: "success", data });
        }
        return res.status(200).json({ status: "failed", message: "Missing params" });
    } catch (error) {
        return res.status(200).json({ status: "failed", message: error.message });
    }
};

module.exports = AuthController;