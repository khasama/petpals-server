const mongoose = require("mongoose");


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
    } catch (err) {
        process.exit(1);
    }
};

module.exports = connectDB;
