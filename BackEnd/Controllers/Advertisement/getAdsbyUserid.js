const postdata = require("../../Models/postdata");

const getAdsbyUserid = async (req, res) => {
    try {
        const id = req.params.id;

        const ads = await postdata.find({ userid: id });
        console.log(ads);
        return res.json({
            status: "success",
            message: "ok",
            ads,
        });
    } catch (error) {
        console.log("Error in getAdsbyUserid in server ", error.message);
        return res.json({
            status: "error",
            message: `Error in getAdsbyUserid in server  ${error.message}`,
        });
    }
};

module.exports = getAdsbyUserid;
