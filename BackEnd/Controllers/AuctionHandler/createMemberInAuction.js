const MembersInAuction = require("../../Models/MembersInAuction");
const createMemberInAuction = async (req, res) => {
    try {
        const { AuctionId, userId } = req.body;

        // Check if the user is already a member in this auction
        const existingMember = await MembersInAuction.findOne({
            AuctionId,
            userId,
        });

        if (existingMember) {
            return res.json({
                status: "error",
                message: "User is already a member in this auction",
            });
        }

        // Create a new member in the auction
        const newMember = new MembersInAuction({
            AuctionId,
            userId,
        });
        await newMember.save();

        return res.json({
            status: "success",
            message: "Member created successfully",
        });
    } catch (error) {
        console.log("Error in createMemberInAuction:", error);
        return res.json({
            status: "error",
            message: "Internal server error",
        });
    }
};
module.exports = createMemberInAuction;
