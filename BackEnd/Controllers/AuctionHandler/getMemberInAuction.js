const MembersInAuction = require("../../Models/MembersInAuction");

const getMemberInAuction = async (req, res) => {
    try {
        const { auctionid } = req.params;
        const result = await MembersInAuction.find({
            AuctionId: auctionid,
        }).populate("userId");
        return res.json({
            status: "success",
            info: result,
        });
    } catch (error) {
        console.log(
            "erro in fetching data getMembers in Auction",
            error.message
        );
        return res.json({
            status: "error",
            message: "error",
        });
    }
};

module.exports = getMemberInAuction;
