require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Conected to database !"))
    .catch((err) => {
        console.error("Error while Connecting to Database : ", err);
        process.exit(1);
    });
