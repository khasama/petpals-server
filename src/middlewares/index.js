require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    verifyTokenManager: (type) => {
        return (req, res, next) => {
            const token = req.session.access_token;
            if (!token) {
                return res.redirect('/login');
            }

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return next(createError.Unauthorized());
                    const role = payload.role;

                    switch (type) {
                        case 1:
                            if (role == "Admin") {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        case 2:
                            if (role == "Admin" || role == "Mod") {
                                next();
                                break;
                            }
                            return next(createError.Forbidden());

                        default:
                            return next(createError.Unauthorized());
                    }
                }
            );
        };
    },
    verifyUser: () => {
        return (req, res, next) => {
            const idUser = req.body.idUser || req.params.id;
            let token;
            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
            } else {
                token = req.session.access_token
            }
            if (!token) return next(createError.Unauthorized());
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return next(createError.Unauthorized());
                    const id = payload.id;
                    if (id != idUser) return next(createError.Forbidden());
                    return next();
                }
            );

        };
    },
    checkRef: (req, res, next) => {
        const ref = req.headers.referer;
        if (ref) {
            const origin = ref.split("//")[1].replace("/", "");
            // (origin);
        }

        next();
    },
};
