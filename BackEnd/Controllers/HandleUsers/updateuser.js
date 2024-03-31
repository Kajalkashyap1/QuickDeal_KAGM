const userdata = require("../../Models/userdata");

const updatedata = async (req, res) => {
    const data = req.params.name;
    try {
        const insertdata = await userdata.updateMany(
            { fullname: data },
            { $set: { fullname: "Abhay Chouhan" } }
        );
        return res.json({
            message: "Updated Successfully !",
            insertdata,
        });
    } catch (e) {
        res.status(201).send(e);
    }
};

module.exports = updatedata;
