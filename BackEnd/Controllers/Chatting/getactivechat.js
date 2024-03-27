const messagedata = require("../../Models/messages");
const ActiveChat = require("../../Models/activechats");

const getactivechats = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ActiveChat.findOne({ user: id })
            .populate("user")
            .populate("members");
        return res.json({
            status: "success",
            message: "ok",
            data,
        });
    } catch (error) {
        console.error("Error in getactivechats :", error);
        return res.json({ status: "error", message: "Internal server error" });
    }
};

module.exports = getactivechats;
