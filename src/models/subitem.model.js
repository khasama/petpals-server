const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subitemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        item: {
            type: String,
            required: true,
            ref: "items",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("subitems", subitemSchema);
