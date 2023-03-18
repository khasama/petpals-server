const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subcategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            ref: "categories",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("subcategories", subcategorySchema);
