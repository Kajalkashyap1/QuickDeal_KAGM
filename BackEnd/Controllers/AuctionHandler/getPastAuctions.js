const auctionproduct = require("../../Models/auctionproduct");

const getPastAuctions = async (req, res) => {
    try {
        const date = new Date().toISOString();

        const liveAuctions = await auctionproduct
            .find({ activetill: { $lt: date } })
            .sort({ activetill: -1 }) // Sort in descending order by activetill
            .limit(12) // Limit the results to the top 16
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
