const auctionproduct = require("../../Models/auctionproduct");

const getPastAuctions = async (req, res) => {
    try {
        const date = new Date().toISOString();

        const liveAuctions = await auctionproduct
            .find({
                activetill: { $lt: date },
            })
            .populate("owner")
            .populate("productid");
        return res.json({
            status: "success",
            liveAuctions,
        });
    } catch (error) {
        console.log("erro in getpast Auctions ", error);
        return res.json({
            status: "error",
            message: "Live auction search error !",
        });
    }
};
module.exports = getPastAuctions;
