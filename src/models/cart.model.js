const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        user: {
            type: String,
            ref: "users",
        },
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
