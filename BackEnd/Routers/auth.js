const express = require("express");
const router = new express.Router();

const login = require("../Controllers/authentication/login");
// const { login } = require("../Controllers/authentication/login_signup_auth");
const register = require("../Controllers/authentication/register");
const logout = require("../Controllers/authentication/logout");
const isloggedin = require("../Controllers/authentication/isloggedin");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/islogin", isloggedin);

module.exports = router;
