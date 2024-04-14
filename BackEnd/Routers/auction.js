const express = require("express");
const router = new express.Router();

const startauction = require("../Controllers/AuctionHandler/Startauction");
const getLiveAuctions = require("../Controllers/AuctionHandler/getLiveAuctions");
const getPastAuctions = require("../Controllers/AuctionHandler/getPastAuctions");
const getCurrentAuctionbyid = require("../Controllers/AuctionHandler/getCurrentAuctionbyid");
const endAuction = require("../Controllers/AuctionHandler/endAuction");

router.post("/startauction", startauction);
router.get("/getLiveAuctions", getLiveAuctions);
router.get("/getPastAuctions", getPastAuctions);
router.get("/getCurrentAuctionbyid/:auctionid", getCurrentAuctionbyid);
router.post("/endAuction", endAuction);

module.exports = router;
