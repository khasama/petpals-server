const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema(
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
        category: {
            type: String,
            required: true,
            ref: "categories",
        },
        subcategory: {
            type: String,
            required: true,
            ref: "subcategories",
        },
        status: {
            type: String,
            default: 'sale'
        },
        owner: {
            type: String,
            required: true,
            ref: "users",
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("pets", petSchema);
