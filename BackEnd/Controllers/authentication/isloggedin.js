const user = require("../../Models/userdata");
const jwt = require("jsonwebtoken");
const isloggedin = (req, res, next) => {
    if (!req.cookies.userRegistered) res.send("NOt");
    try {
        const decoded = jwt.verify(
            req.cookies.userRegistered,
            process.env.JWT_SECRET
        );
        console.log(decoded);
    } catch (err) {
        if (err) return next();
    }
};

module.exports = isloggedin;
