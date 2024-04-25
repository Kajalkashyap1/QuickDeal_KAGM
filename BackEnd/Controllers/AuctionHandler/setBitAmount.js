const setBitAmount = require("../../Models/BidAmount");
const saveBitAmount = async (req, res) => {
    try {
        const { auctionid } = req.params;
        const data = {
            senderId: req.body.senderId,
            amount: req.body.message,
            auctionid,
        };
        const insert = new setBitAmount(data);
        await insert.save();

        return res.json({
            status: "success",
            message: "Bid created successfully",
        });
    } catch (error) {
        console.log("Error in Bid creation:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};
module.exports = saveBitAmount;
