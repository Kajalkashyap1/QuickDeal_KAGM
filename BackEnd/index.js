const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const userdata = require("./Models/userdata.js");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
    },
});
// ----------------------------------------Socket io implementations----------------------------------------------------------
// Socket.io
let users = [];
io.on("connection", (socket) => {
    // console.log("User connected", socket.id);
    socket.on("addUser", (userId) => {
        const isUserExist = users.find((user) => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit("getUsers", users);
        }
    });

    socket.on(
        "sendMessage",
        async ({ senderId, receiverId, message, conversationId, date }) => {
            const receiver = users.find((user) => user.userId === receiverId);
            const sender = users.find((user) => user.userId === senderId);
            const senderinfo = await userdata.findById(senderId);
            const recieverinfo = await userdata.findById(receiverId);
            // console.log("sender :>> ", sender, receiver);
            if (receiver) {
                io.to(receiver.socketId)
                    .to(sender.socketId)
                    .emit("getMessage", {
                        senderId,
                        message,
                        conversationId,
                        receiverId,
                        date,
                        sender: {
                            id: senderinfo._id,
                            fullName: senderinfo.fullName,
                            email: senderinfo.email,
                        },
                        reciever: {
                            id: recieverinfo._id,
                            fullName: recieverinfo.fullName,
                            email: recieverinfo.email,
                        },
                    });
                // console.log(`Message sent from ${senderinfo.fullname}`);
            } else {
                io.to(sender.socketId).emit("getMessage", {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    date,
                    sender: {
                        id: senderinfo._id,
                        fullName: senderinfo.fullName,
                        email: senderinfo.email,
                    },
                });
            }
        }
    );

    socket.on("disconnect", () => {
        users = users.filter((user) => user.socketId !== socket.id);
        io.emit("getUsers", users);
    });
    // io.emit('getUsers', socket.userId);
});

// ----------------------------------------Socket io implementations----------------------------------------------------------

// connect to cloudinary
const cloudinary = require("./Connections/CloudinaryConn.js");
cloudinary.cloudinaryConnect();

//connect to database
require("./Connections/DatabaseConn.js");

app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ok");
});

app.use("/auth", require("./Routers/auth.js"));
app.use("/dashboard", require("./Routers/HandleAds.js"));
app.use("/profile", require("./Routers/users.js"));
app.use("/chatting", require("./Routers/chatting.js"));

server.listen(port);
