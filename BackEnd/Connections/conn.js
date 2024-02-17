const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/QuickDeal")
  .then(console.log("Conected to database ! "))
  .catch((err) => {
    console.log("Error while Connecting to Database : ", err);
  });
