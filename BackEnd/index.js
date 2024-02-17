const express = require("express");
const app = express();
const router = require("./Routers/routes");
const userdata = require("./Models/userdata");
require("./connections/conn");
const port = process.env.PORT || 8000;
// require("./Connections/database/dbconnect");

app.get("/", (req, res) => {
  res.send("Hello frem server ! ");
});
    // kjhj
app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
