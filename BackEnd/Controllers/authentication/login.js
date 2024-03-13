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
            console.log("Cookie set:", token); // Log the cookie value
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
                res.status(401).json({
                    success: false,
                    message: "user not registered",
                });
            }

            const payload = {
                email: user.email,
                id: user._id,
            };

            //verify password and generate a JWT token
            if (await bcrypt.compare(password, user.password)) {
                //password match
                let token = await jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });

                // user.token = token;
                // user.password = undefine;

                const option = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };

                res.cookie("token", token, option).status(200).json({
                    success: true,
                    token,
                    user,
                    message: "user logged in successfully",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "password do not match",
                });
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = login;
