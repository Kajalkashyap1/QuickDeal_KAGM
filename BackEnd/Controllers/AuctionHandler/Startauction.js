const auctionproduct = require("../../Models/auctionproduct");

const startauction = async (req, res) => {
    try {
        const data = req.body;
        const insertdata = new auctionproduct(data);
        await insertdata.save();

        return res.json({
            status: "success",
            message: "Auction created Successfully !",
            insertdata,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            message: "Auction creatoin error !",
        });
    }
};
module.exports = startauction;
