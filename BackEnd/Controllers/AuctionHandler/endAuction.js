const AuctionProduct = require("../../Models/auctionproduct");

const endAuction = async (req, res) => {
    try {
        const { auctionid } = req.body;

        // Set activetill field to a past time (e.g., current time minus 1 hour)
        const pastTime = new Date(Date.now() - 1 * 60 * 60 * 1000); // 1 hour ago
        const updatedAuction = await AuctionProduct.findByIdAndUpdate(
            auctionid,
            { $set: { activetill: pastTime } },
            { new: true } // Return the updated document
        );
        
        if (!updatedAuction) {
            return res.json({
                status: "error",
                message: "Auction not found",
            });
        }

        return res.json({
            status: "success",
            message: "Auction ended successfully",
            updatedAuction,
        });
    } catch (error) {
        console.log("Error in endAuction:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};

module.exports = endAuction;
