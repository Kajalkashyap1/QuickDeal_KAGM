const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

function currentTime() {
    return new Date().getTime(); // Returns current timestamp
}
const advertisementPostSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    useremail: {
        type: String,
    },
    username: {
        type: String,
    },
    imageurl: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: Date,
        default: currentTime,
    },
    productname: {
        type: String,
    },
    adtitle: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
});

const postdata = new mongoose.model("postdata", advertisementPostSchema);

module.exports = postdata;
