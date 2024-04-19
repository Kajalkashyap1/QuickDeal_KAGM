const BidAmount = require("../../Models/BidAmount");

const getBitAmounts = async (req, res) => {
    try {
        const { auctionid } = req.params;

        const liveAuctions = await BidAmount.find({ auctionid })
            .populate("senderId")
            .sort({ amount: -1 });
        return res.json({
            status: "success",
            liveAuctions,
        });
    } catch (error) {
        console.log("erro in get past bids ", error);
        return res.json({
            status: "error",
            message: "Live auction search error !",
        });
    }
};
module.exports = getBitAmounts;
