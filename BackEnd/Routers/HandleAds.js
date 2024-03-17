const express = require("express");
const router = new express.Router();

const localfileUpload = require("../Controllers/Advertisement/localimageupload.js");
const clouduploadimage = require("../Controllers/Advertisement/clouduploadimage.js");
const getposts = require("../Controllers/Advertisement/getpostdatas");
router.post("/localfileupload", localfileUpload);
router.post("/uploadimage", clouduploadimage);
router.get("/getposts", getposts);

module.exports = router;
