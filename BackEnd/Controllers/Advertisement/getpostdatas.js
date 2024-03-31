const postdata = require("../../Models/postdata.js");

const getpostdatas = async (req, res) => {
    try {
        var data = await postdata.find();
        res.json({
            status: "Success",
            result: data,
        });
    } catch (error) {
        res.json({
            status: "Error",
            result: error,
        });
    }
};

module.exports = getpostdatas;
