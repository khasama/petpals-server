const mongoose = require("mongoose");
require("dotenv").config();
// const logger = require("../utils/log");

const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const DATABASE = process.env.MONGO_DATABASE;

const db = `mongodb+srv://${USER}:${PASS}@mycluster.bkxfl.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // logger.info("Connect database success");
    } catch (err) {
        // logger.error(err.stack || err);
        // console.log("Error " + err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
