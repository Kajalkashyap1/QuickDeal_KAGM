const express = require("express");
const app = express();
const router = require("./Routers/routes");
const userdata = require("./Models/userdata");
require("./connections/conn");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
