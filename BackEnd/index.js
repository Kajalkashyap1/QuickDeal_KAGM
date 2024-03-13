const express = require("express");
const app = express();
const cors = require("cors");
require("./Connections/conn");
const cookie = require("cookie-parser");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET ,PORT , PUT , DELETE , PSTCH",
        credentials: true,
    })
);
app.use(cookie());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ok");
});
app.use("/auth", require("./Routers/auth.js"));
app.use("/users", require("./Routers/users.js"));
app.listen(port);
