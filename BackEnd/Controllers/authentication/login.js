const userdata = require("../../Models/userdata");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const login = async (req, res) => {
    try {
        if (req.body.isgoogle) {
            var email = req.body.value.email;
            const token = await jwt.sign(
                { email: email },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES,
                }
            );
            const cookieOptions = {
                expires: new Date(
                    Date.now() +
                        process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };
            res.cookie("userRegistered", token, cookieOptions);
            // console.log("Cookie set:", token); // Log the cookie value
            res.status(200).json({
                status: "success",
                message: "User has been logged in ",
            });
        } else {
            // non google api login
            const { email, password } = req.body;
            //check for registered user
            const user = await userdata.findOne({ email });
            //if user is not registered
            if (!user) {
                return res.json({
                    status: "error",
                    message: "user not registered",
                });
            }
            const payload = {
                fullname: user.fullname,
                email: user.email,
                id: user._id,
            };
            //verify password and generate a JWT token
            if (await bcrypt.compare(password, user.password)) {
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
                    message: "User login and cookie stored !",
                });
            } else {
                return res.json({
                    status: "error",
                    message: "password do not match",
                });
            }
        }
    } catch (error) {
        // console.error("Error during login:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
    // console.log(req.body);
    // const email = req.body.email;
    // const user = await userdata.findOne({ email });
    // if (!user) {
    //     return res.json({
    //         status: "error",
    //         message: "No user found !",
    //     });
    // } else {
    //     console.log(user);
    //     const email = user.email;
    //     const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    //         expiresIn: process.env.JWT_EXPIRES,
    //     });
    //     const cookieOptions = {
    //         expires: new Date(
    //             Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    //         ),
    //         httpOnly: true,
    //     };
    //     res.cookie("token", token, cookieOptions);
    //     res.status(200).json({
    //         status: "success",
    //         message: "Login Success !",
    //     });
    // }
};

module.exports = login;
