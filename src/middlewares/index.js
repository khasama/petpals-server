const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    verifyAdmin: (type) => {
        return (req, res, next) => {
            const token = req.session.access_token;
            if (!token) {
                req.session.access_token = undefined;
                req.session.user = undefined;
                return res.redirect('/login');
            }

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, payload) => {
                    if (!err) {
                        const role = payload.role;
                        switch (type) {
                            case 1:
                                if (role == "admin") {
                                    next();
                                    break;
                                }
                                return res.redirect('/login');

                            case 2:
                                if (role == "admin" || role == "mob") {
                                    next();
                                    break;
                                }
                                return res.redirect('/login');

                            default:
                                return res.redirect('/login');
                        }

                    } else {
                        console.log({ err });
                        req.session.access_token = undefined;
                        req.session.user = undefined;
                        return res.redirect("/login");
                    }
                }
            );
        };
    },
    verifyUser: (req, res, next) => {
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
