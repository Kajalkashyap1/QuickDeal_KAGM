const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./Connections/database/dbconnect");

app.get("/", (req, res) => {
  res.send("Hello frem server ! ");
});

app.listen(port, () => {
  console.log("Connected to the port", port);
});
