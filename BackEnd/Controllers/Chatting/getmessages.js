const messagedata = require("../../Models/messages");
const ActiveChat = require("../../Models/activechats");

const getMessages = async (req, res) => {
    try {
        const sender = req.params.sender;
        const receiver = req.params.receiver;
        const data = await messagedata
            .find({
                $or: [
                    { sender: sender, receiver: receiver },
                    { sender: receiver, receiver: sender },
                ],
            })
            .sort({ date: 1 })
            .populate("sender receiver");
        return res.json({
            status: "success",
            message: "ok",
            data,
        });
    } catch (error) {
        console.error("Error in getMessages :", error);
        return res.json({ status: "error", message: "Internal server error" });
    }
};

module.exports = getMessages;
