const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user: {
            type: String,
            ref: "users",
        },
        fullName: { type: String, require: true },
        address: { type: String, require: true },
        email: { type: String, require: true },
        phone: { type: String, require: true },
        products: [
            {
                product: {
                    type: String,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            }
        ],
        total: {
            type: Number,
            require: true
        },
        payment: {
            type: String,
            require: true
        },
        status: {
            type: String,
            require: true,
            default: 'Đang xác nhận'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
