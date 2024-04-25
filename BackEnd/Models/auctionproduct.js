const mongoose = require("mongoose");
require("dotenv").config();

const auction = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userdata schema
        ref: "postdata",
    },
    activetill: {
        type: Date,
    },
    amountforauction: {
        type: "Number",
    },
});

const productOnAuction = new mongoose.model("productOnAuction", auction);

module.exports = productOnAuction;
