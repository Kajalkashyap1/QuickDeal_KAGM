const express = require("express");
const router = new express.Router();

const getdata = require("../Controllers/HandleUsers/getoneuser");
const getUserById = require("../Controllers/HandleUsers/getUserById");
const deleteuser = require("../Controllers/HandleUsers/deleteuser");
const createuser = require("../Controllers/HandleUsers/createuser");
const updatedata = require("../Controllers/HandleUsers/updateuser");

// router.get("/users", getdata);
// router.get("/userdata", getdata);
// router.get("/userdata/:email", getUserById);
// router.delete("/users/:id", deleteuser);
// router.post("/users", createuser);
// router.patch("/users/:name", updatedata);

router.get("/getuserinfo/:id", getUserById);

module.exports = router;
