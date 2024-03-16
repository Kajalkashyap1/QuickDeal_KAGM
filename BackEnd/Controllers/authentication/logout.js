const logout = (req, res) => {
    try {
        res.clearCookie("userRegistered");
        return res.json({
            status: "success",
            message: "Logout Successful ! ",
        });
    } catch (err) {
        return res.json({
            status: "error",
            message: "Logout error ! ",
        });
    }
};
module.exports = logout;
