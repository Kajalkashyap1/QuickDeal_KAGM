const mongoose = require("mongoose");

const BidAmountschema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata", // Collection name of the userdata schema
    },
    amount: {
        type: Number,
    },
    auctionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productOnAuction", // Collection name of the userdata schema
    },
});

const BidAmount = new mongoose.model("BidAmount", BidAmountschema);

module.exports = BidAmount;
