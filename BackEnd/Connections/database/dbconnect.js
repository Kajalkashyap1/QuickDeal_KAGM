const mongoose = require("mongoose");

mongoose
  .connect("mongodb://172.0.0.1:27017/gourav")
  .then(console.log("Connected to db"))
  .catch((err) => {
    return err;
  });
