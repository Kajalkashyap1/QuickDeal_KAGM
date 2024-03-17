const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

function currentTime() {
    return new Date().getTime(); // Returns current timestamp
}
const advertisementPostSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    imageurl: {
        type: String,
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
        type: string,
    },
    adtitle: {
        type: string,
    },
    description: {
        type: string,
    },
    price: {
        type: Number,
    },
    location: {
        type: string,
    },
});

const postdata = new mongoose.model("postdata", advertisementPostSchema);

module.exports = postdata;
