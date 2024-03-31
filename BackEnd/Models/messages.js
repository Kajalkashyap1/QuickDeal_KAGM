const express = require("express");
const mongoose = require("mongoose");

function currentTime() {
    return new Date().getTime(); // Returns current timestamp
}

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userdata schema
        ref: "userdata", // Collection name of the userdata schema
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userdata schema
        ref: "userdata", // Collection name of the userdata schema
    },
    message: {
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
});

const messagedata = new mongoose.model("message", messageSchema);

module.exports = messagedata;
