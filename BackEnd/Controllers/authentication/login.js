const userdata = require("../../Models/userdata");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    try {
        // non google api login
        const { email, password } = req.body;
        //check for registered user
        const user = await userdata.findOne({ email });
        //if user is not registered
        if (!user) {
            return res.json({
                status: "error",
                message: "User not registered",
            });
        }
        const payload = {
            fullname: user.fullname,
            email: user.email,
            id: user._id,
            imageurl: user.imageurl,
        };
        //verify password and generate a JWT token
        let flag = true;
        if (!req.body.isgoogle) {
            flag = await bcrypt.compare(password, user.password);
        }
        if (flag) {
            //password match
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES,
            });
            const cookieOptions = {
                expires: new Date(
                    Date.now() +
                        process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };
            res.cookie("userRegistered", token, cookieOptions);
            return res.json({
                status: "success",
                message: "User logged in !",
            });
        } else {
            return res.json({
                status: "error",
                message: "Wrong Password !",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = login;
