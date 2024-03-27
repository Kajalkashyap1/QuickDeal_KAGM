const userdata = require("../../Models/userdata");

const getuser = async (req, res) => {
    try {
        const data = await userdata.find();
        res.status(200).json({
            status: "Success",
            result: data,
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
        });
        throw error;
    }
};

module.exports = getuser;
