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
// const connectedUsers = {};
// const offlineMessageQueue = {}; // Message queue for offline users

// io.on("connection", (socket) => {
//     socket.on("login", (userId) => {
//         socket.userId = userId;
//         connectedUsers[userId] = socket;
//         console.log("User logged in: ", socket.userId);
//         console.log("Connected users:", Object.keys(connectedUsers));

//         // Check if the user has any pending offline messages
//         if (offlineMessageQueue[userId]) {
//             offlineMessageQueue[userId].forEach((offlineMessage) => {
//                 socket.emit("recieved", offlineMessage);
//             });
//             delete offlineMessageQueue[userId]; // Clear the offline message queue
//         }
//     });

//     socket.on("send-message", ({ recipientId, message }) => {
//         const recipientSocket = connectedUsers[recipientId];
//         if (recipientSocket) {
//             // Recipient is online, send the message directly
//             recipientSocket.emit("recieved", {
//                 senderId: socket.userId,
//                 message,
//             });
//             console.log(
//                 "Private message sent from",
//                 socket.userId,
//                 "to",
//                 recipientId
//             );
//         } else {
//             // Recipient is offline, add the message to the offline message queue
//             if (!offlineMessageQueue[recipientId]) {
//                 offlineMessageQueue[recipientId] = [];
//             }
//             offlineMessageQueue[recipientId].push({
//                 senderId: socket.userId,
//                 message,
//             });
//             console.log(
//                 "Recipient is not online, message added to offline queue"
//             );
//         }
//     });

//     socket.on("disconnect", () => {
//         // Cleanup on disconnect
//         if (socket.userId) {
//             delete connectedUsers[socket.userId];
//             console.log("User disconnected:", socket.userId);
//         }
//     });
// });
// ---------------------------------------------------------------------
// const connectedUsers = {};

// io.on("connection", (socket) => {
//     // console.log(`User Conneced ${socket.id}`);

//     socket.on("login", (user_id) => {
//         socket.user_id = user_id;
//         connectedUsers[user_id] = socket;
//         console.log("User logged in: ", socket.user_id);
//         console.log(connectedUsers.length);
//         for (const userId in connectedUsers) {
//             console.log(
//                 `User ID: ${userId}, Socket ID: ${connectedUsers[userId].id}`
//             );
//         }
//     });

//     socket.on("send-message", ({ recipientId, message }) => {
//         console.log(recipientId);
//         const recipientSocket = connectedUsers[recipientId];
//         if (recipientSocket) {
//             recipientSocket.emit("recieved", {
//                 senderId: socket.user_id,
//                 message,
//             });
//             console.log(
//                 "Private message sent from",
//                 socket.user_id,
//                 "to",
//                 recipientId
//             );
//         } else {
//             console.log("Recipient is not online");
//         }
//     });
// });

////////////////////////////////////////////////////////////////////////////////////
// io.on("connection", (socket) => {
//     console.log(`User Conneced ${socket.id}`);
//     socket.on("send-message", (data) => {
//         const messageWithSocketId = {
//             socketId: socket.id,
//             message: data.message,
//         };
//         io.emit("recieved", messageWithSocketId);
//     });
// });

////////////////////////////????????????????????????????????????????????????????????????

// Socket.io
let users = [];
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
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
            console.log("sender :>> ", sender, receiver);
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
                console.log(`Message sent from ${senderinfo.fullname}`);
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
