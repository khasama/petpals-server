const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
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
