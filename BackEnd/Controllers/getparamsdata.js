const userdata = require("../Models/userdata");

const getparamsdata = async (req, res) => {
  const email = req.params.email;
  try {
    const data = await userdata.find({
      _id: email,
    });
    return res.json({
      data,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getparamsdata;
