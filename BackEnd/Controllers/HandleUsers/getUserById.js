const userdata = require("../../Models/userdata");

const getparamsdata = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userdata.find({
            _id: id,
        });
        return res.json({
            status: "success",
            data,
        });
    } catch (error) {
        console.log("error while sending user data ");
        return res.json({
            status: "error",
            message: "error in data fetching in user",
        });
    }
};

module.exports = getparamsdata;
