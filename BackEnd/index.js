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
const server = http.createServer(app);

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
    },
});
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// connect to cloudinary
const cloudinary = require("./Connections/CloudinaryConn.js");
cloudinary.cloudinaryConnect();

//connect to database
require("./Connections/DatabaseConn.js");

app.get("/", (req, res) => {
    res.send("ok");
});

app.use("/auth", require("./Routers/auth.js"));
app.use("/dashboard", require("./Routers/HandleAds.js"));
app.use("/profile", require("./Routers/users.js"));
app.use("/auction", require("./Routers/auction.js"));
app.use("/chatting", require("./Routers/chatting.js"));
// -------------------------------------------------------------------------------------------

// Socket.io

// ----------------------------------------Socket io implementations for chatting stars----------------------------------------------------------
const chatNamespace = io.of("/chat"); // Create a namespace for /chat
let users = [];
chatNamespace.on("connection", (socket) => {
    console.log("user joined chatting ", socket.id);
    socket.on("addUser", (userId) => {
        const isUserExist = users.find((user) => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            chatNamespace.emit("getUsers", users);
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
                chatNamespace
                    .to(receiver.socketId)
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
                chatNamespace.to(sender.socketId).emit("getMessage", {
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
        chatNamespace.emit("getUsers", users);
        console.log("User Disconnected from chat : ", socket.id);
    });
    // io.emit('getUsers', socket.userId);
});
// ----------------------------------------Socket io implementations for chatting ends----------------------------------------------------------

// ----------------------------------------Socket io implementation for Auction starts
let UsersInAuction = [];
const auctionNamespace = io.of("/auction");

auctionNamespace.on("connection", (socket) => {
    console.log("User Joined auction : ", socket.id);
    socket.on("disconnect", () => {
        console.log("User Disconnected from auction : ", socket.id);
    });
});

server.listen(port);
