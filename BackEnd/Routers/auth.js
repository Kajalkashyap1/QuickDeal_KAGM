const express = require("express");
const router = new express.Router();

const login = require("../Controllers/authentication/login");
const register = require("../Controllers/authentication/register");
const logout = require("../Controllers/authentication/logout");
const verifyuser = require("../Controllers/authentication/verifyuser");
const isloggedin = require("../Controllers/authentication/isloggedin");
const sendotp = require("../Controllers/authentication/sendotp");
const validateuser = require("../Controllers/authentication/validateuser");
const sendotpResetpass = require("../Controllers/Resetpassword/sendotp");
const verifyotp = require("../Controllers/Resetpassword/verifyotp");
const resetpassword = require("../Controllers/Resetpassword/resetpassword");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/islogin", verifyuser, isloggedin);
router.post("/sendotp", sendotp);
router.post("/validateuser", validateuser);
router.post("/resetpassword/sendotp", sendotpResetpass);
router.post("/resetpassword/verifyotp", verifyotp);
router.post("/resetpassword/updatepassword", resetpassword);

module.exports = router;
