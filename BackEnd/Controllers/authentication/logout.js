const logout = (req, res) => {
    res.clearCookie("userRegistered");
    // res.redirect("/");
    res.send("logout Successfull");
};
module.exports = logout;
