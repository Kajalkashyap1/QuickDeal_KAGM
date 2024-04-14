const express = require("express");
const router = new express.Router();

const startauction = require("../Controllers/AuctionHandler/Startauction");
const getLiveAuctions = require("../Controllers/AuctionHandler/getLiveAuctions");

router.post("/startauction", startauction);
router.get("/getLiveAuctions", getLiveAuctions);

module.exports = router;
