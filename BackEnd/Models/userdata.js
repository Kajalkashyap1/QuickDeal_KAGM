const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

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

const userdata = new mongoose.model("userdata", user);

module.exports = userdata;
