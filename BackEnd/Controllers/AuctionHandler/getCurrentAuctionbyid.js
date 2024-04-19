const auctionproduct = require("../../Models/auctionproduct");

const getCurrentAuctionbyid = async (req, res) => {
    try {
        const { auctionid } = req.params;
        const liveAuctions = await auctionproduct
            .findOne({
                _id: auctionid,
            })
            .populate("owner")
            .populate("productid");
        return res.json({
            status: "success",
            liveAuctions,
        });
    } catch (error) {
        console.log("error in getCurrentAuctionbyid ", error);
        return res.json({
            status: "error",
            message: "Live auction search error !",
        });
    }
};
module.exports = getCurrentAuctionbyid;
