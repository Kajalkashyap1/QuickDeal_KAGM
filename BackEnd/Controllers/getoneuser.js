const userdata = require("../Models/userdata");

const getuser = async (req, res) => {
  try {
    const data = await userdata.find();
    return res.json({
      status: "Success",
      result: data,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = getuser;
