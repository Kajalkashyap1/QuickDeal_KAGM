const express = require("express");

const User = require("../../Models/userdata");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { fullname, email, contactNo, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "user already exists",
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.staus(500).json({
                success: false,
                message: "error in hashing password",
            });
        }

        //create entry for new user
        const user = await User.create({
            fullname,
            email,
            contactNo,
            password: hashedPassword,
        });

        res.status(200).json({
            success: true,
            message: "user created successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "user cannot be registred",
        });
    }
};

//login code
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "fill the detail carefully",
            });
        }

        //check for registered user
        const user = await User.findOne({ email });

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
            role: user.role,
        };

        //verify password and generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "invalid",
        });
    }
};
