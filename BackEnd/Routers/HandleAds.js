const express = require("express");
const router = new express.Router();

const localfileUpload = require("../Controllers/Advertisement/localimageupload.js");
const clouduploadimage = require("../Controllers/Advertisement/clouduploadimage.js");
const getposts = require("../Controllers/Advertisement/getpostdatas");
const getpostbyid = require("../Controllers/Advertisement/getpostbyid.js");
const getAdsbyUserid = require("../Controllers/Advertisement/getAdsbyUserid");
const updatePostLikes = require("../Controllers/Advertisement/updatePostLikes");
const getLikedPosts = require("../Controllers/Advertisement/getLikedPosts");

router.post("/localfileupload", localfileUpload);
router.post("/uploadimage", clouduploadimage);
router.get("/getposts", getposts);
router.get("/post/:id", getpostbyid);
router.get("/myads/:id", getAdsbyUserid);
router.post("/updatePostLikes/:postid/:userid", updatePostLikes);
router.get("/getLikedPosts/:userid", getLikedPosts);

module.exports = router;
