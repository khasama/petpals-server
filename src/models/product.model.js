const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        images: {
            type: Array,
        },
        price: {
            type: Number,
            required: true,
        },
        item: {
            type: String,
            required: true,
            ref: "items",
        },
        subitem: {
            type: String,
            required: true,
            ref: "subitems",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
