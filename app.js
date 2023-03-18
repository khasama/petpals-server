require("dotenv").config();
const express = require("express");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const session = require("express-session");
// const compression = require("compression");
// const connect = require("./src/configs/mongo");
const fileUpload = require("express-fileupload");
// const Redis = require("ioredis");
// const RedisStore = require("connect-redis").default;
// const clientRedis = new Redis();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});
const SocketService = require("./src/services/socket.service");

app.disable('x-powered-by');
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.set("view engine", "ejs");
app.use("/public", express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(
    session({
        // store: new RedisStore({ client: clientRedis }),
        secret: process.env.SESION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);
io.on("connection", (socket) => {
    SocketService.init(socket, io);
});

// app.use(compression());
// app.use("/api/v1", require("./src/routes"));
app.use(require("./src/routes"));

app.use((req, res, next) => {
    next(createError.NotFound());
});
app.use((err, req, res, next) => {
    return res.status(err.status).json({
        status: "error",
        message: err.message,
    });
})

module.exports = app;