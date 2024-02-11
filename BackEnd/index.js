const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello frem server ! ");
});

app.listen(port, () => {
  console.log("Connected to THE", port);
});
