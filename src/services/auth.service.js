const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const AUthService = {};

AUthService.login = async (username, password) => {
    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            const hashPass = user.password;
            const match = await bcrypt.compare(password, hashPass);
            if (match) {
                const payload = {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    address: user.address,
                    email: user.email,
                };

                return payload;
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

AUthService.register = async (username, password) => {
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username,
                password: hashPass,
            });
            return await newUser.save();
        } else {
            throw new Error("Username exist !!!");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = AUthService;
