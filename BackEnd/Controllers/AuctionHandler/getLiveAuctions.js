const auctionproduct = require("../../Models/auctionproduct");

const getLiveAuctions = async (req, res) => {
    try {
        const date = new Date().toISOString();

        const liveAuctions = await auctionproduct
            .find({
                activetill: { $gt: date },
            })
            .populate("owner")
            .populate("productid");
        return res.json({
            status: "success",
            liveAuctions,
        });
    } catch (error) {
        console.log("erro in getliveAuctions ", error);
        return res.json({
            status: "error",
            message: "Live auction search error !",
        });
    }
};
module.exports = getLiveAuctions;
