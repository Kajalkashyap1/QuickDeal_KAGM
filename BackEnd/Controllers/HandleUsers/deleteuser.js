const userdata = require("../../Models/userdata");

const deleteuser = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userdata.findByIdAndDelete({ _id: id });
        return res.json({
            messsage: "User deleted !",
            data,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = deleteuser;
