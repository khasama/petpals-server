const createError = require("http-errors");
const AuthService = require("../../services/auth.service");

const AuthController = {};

AuthController.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const result = await AuthService.register(email, password);
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
        const { email, password } = req.body;
        if (email && password) {
            const data = await AuthService.login(email, password);
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