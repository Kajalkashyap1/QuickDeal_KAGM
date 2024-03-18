const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

function isMNNITEmail(email) {
    return email.endsWith("@mnnit.ac.in");
}

const user = new mongoose.Schema({
    isGooglelogin: {
        type: Boolean,
        default: false,
    },
    fullname: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [
            {
                validator: validator.isEmail,
                message: "Invalid email format",
            },
            {
                validator: isMNNITEmail,
                message: "Please Register through MNNIT mail Id",
            },
        ],
    },
    contactNo: {
        type: Number,
        unique: true,
        default: 0,
    },
    password: {
        type: String,
        required: true,
        default: "",
    },
    imageurl: {
        type: String,
        default: null,
    },
});

user.post("save", async function (data) {
    console.log("data -", data.email);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: data.email,
            subject: "One Time Password(OTP)",
            html: ``, // html body
        });

        console.log(info);
    } catch (error) {
        console.log(error);
    }
});

const userdata = new mongoose.model("userdata", user);

module.exports = userdata;
