const express = require("express");
const router = new express.Router();

const savechats = require("../Controllers/Chatting/savechats");
const getactivechat = require("../Controllers/Chatting/getactivechat");
const getmessages = require("../Controllers/Chatting/getmessages");

router.post("/storemessages", savechats);
router.get("/getactivechat/:id", getactivechat);
router.get("/getmessages/:sender/:receiver", getmessages);

module.exports = router;
