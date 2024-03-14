const loggedin = (req, res) => {
    return res.json({
        status: "success",
        name: req.name,
        email: req.email,
        id: req.id,
    });
};
module.exports = loggedin;
