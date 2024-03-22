const postdata = require("../../Models/postdata.js");

const getpostbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await postdata.findOne({ _id: id });
        res.json({
            status: "success",
            message: "data fetched succesfully",
            info,
        });
    } catch (error) {
        console.log("error in getpostby id ", error);
        res.json({
            status: "error",
            message: "error in geting post by id",
        });
    }
};

module.exports = getpostbyid;
