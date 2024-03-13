const express = require("express");
const router = new express.Router();

const getdata = require("../Controllers/getoneuser");
const getparamsdata = require("../Controllers/getparamsdata");
const deleteuser = require("../Controllers/deleteuser");
const createuser = require("../Controllers/createuser");
const updatedata = require("../Controllers/updateuser");
const {login,signup} = require('../Controllers/login_signup_auth.js');

router.get("/users", getdata);
router.get("/userdata", getdata);
router.get("/users/:email", getparamsdata);
router.get("/userdata/:email", getparamsdata);
router.delete("/users/:id", deleteuser);
router.post("/users", createuser);
router.patch("/users/:name", updatedata);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
