const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const { signAccessToken } = require("../utils/jwt");

const AUthService = {};

AUthService.login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const hashPass = user.password;
            const match = await bcrypt.compare(password, hashPass);
            if (match) {
                const payload = {
                    id: user._id,
                    role: user.role,
                    avatar: `${global.domain}media/image/${user.avatar}`,
                    phone: user.phone,
                    address: user.address,
                    email: user.email,
                };
                const accessToken = await signAccessToken(payload);
                return { ...payload, ...{ accessToken } };
            } else {
                throw new Error("Wrong pass !!!");
            }
        } else {
            throw new Error("Not found !!!");
        }
    } catch (error) {
        throw error;
    }
};

AUthService.register = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                email,
                password: hashPass,
            });
            return await newUser.save();
        } else {
            throw new Error("Email exist !!!");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = AUthService;
