const jwt = require("jsonwebtoken");

const verifyuser = (req, res, next) => {
    try {
        if (!req.cookies.userRegistered)
            return res.json({
                status: "error",
                message: "You are not logged in",
            });
        else {
            jwt.verify(
                req.cookies.userRegistered,
                process.env.JWT_SECRET,
                (err, decoded) => {
                    if (err) {
                        return res.json({
                            status: "error",
                            message: "token is not okey",
                        });
                    } else {
                        req.name = decoded.fullname;
                        req.email = decoded.email;
                        req.id = decoded.id;
                        req.imageurl = decoded.imageurl;
                        next();
                    }
                }
            );
        }
    } catch (err) {
        if (err) return next();
    }
};

module.exports = verifyuser;
