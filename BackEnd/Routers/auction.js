const express = require("express");
const router = new express.Router();

const startauction = require("../Controllers/AuctionHandler/Startauction");
const getLiveAuctions = require("../Controllers/AuctionHandler/getLiveAuctions");
const getPastAuctions = require("../Controllers/AuctionHandler/getPastAuctions");
const getCurrentAuctionbyid = require("../Controllers/AuctionHandler/getCurrentAuctionbyid");
const endAuction = require("../Controllers/AuctionHandler/endAuction");
const createMemberInAuction = require("../Controllers/AuctionHandler/createMemberInAuction");
const getMemberInAuction = require("../Controllers/AuctionHandler/getMemberInAuction");
const setBitAmount = require("../Controllers/AuctionHandler/setBitAmount");
const getBitAmounts = require("../Controllers/AuctionHandler/getBitAmounts");

router.post("/startauction", startauction);
router.get("/getLiveAuctions", getLiveAuctions);
router.get("/getPastAuctions", getPastAuctions);
router.get("/getCurrentAuctionbyid/:auctionid", getCurrentAuctionbyid);
router.get("/getMemberInAuction/:auctionid", getMemberInAuction);
router.get("/getBitAmounts/:auctionid", getBitAmounts);
router.post("/endAuction", endAuction);
router.post("/createMemberInAuction", createMemberInAuction);
router.post("/setBitAmount/:auctionid", setBitAmount);

module.exports = router;
