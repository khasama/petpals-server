const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        avatar: {
            type: String,
            default: '1vxQWfkW0t3NpXd26Jd7gsB60TpUM-Yng'
        },
        role: {
            type: String,
            default: 'customer'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
