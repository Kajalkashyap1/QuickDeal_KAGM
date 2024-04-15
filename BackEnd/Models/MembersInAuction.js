const mongoose = require("mongoose");

const MembersInAuctionschema = new mongoose.Schema({
    AuctionId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userdata schema
        ref: "productOnAuction", // Collection name of the userdata schema
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata", // Collection name of the userdata schema
    },
});

const MembersInAuction = new mongoose.model(
    "MembersInAuction",
    MembersInAuctionschema
);

module.exports = MembersInAuction;
