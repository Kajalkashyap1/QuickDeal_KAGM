const userdata = require("../../Models/userdata");

const updatedata = async (req, res) => {
    const data = req.body;
    const insertdata = new userdata(data);
    try {
        const indata = await insertdata.save();
        return res.json({
            message: "User created",
            indata,
        });
    } catch (e) {
        res.status(201).send(e);
    }
};

module.exports = updatedata;
