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
        // console.log("User Disconnected from chat : ", socket.id);
    });
    // io.emit('getUsers', socket.userId);
});
// ----------------------------------------Socket io implementations for chatting ends----------------------------------------------------------

// ----------------------------------------Socket io implementation for Auction starts
let UsersInAuction = [];
const auctionNamespace = io.of("/auction");

// auctionNamespace.on("connection", (socket) => {
//     var auctionId;
//     var activeUserId;
//     console.log("User Joined auction : ", socket.id);
//     socket.on(
//         "joinAuctionRoom",
//         ({ activeUserId, auctionId, username, useremail }) => {
//             console.log(`Member ${activeUserId} joined ${auctionId}`);
//             auctionId = auctionId;
//             activeUserId = username;
//             // Check if the user is already in the room
//             const isUserInRoom =
//                 UsersInAuction[auctionId] &&
//                 UsersInAuction[auctionId].find(
//                     (user) => user.userId === activeUserId
//                 );

//             if (!isUserInRoom) {
//                 socket.join(auctionId);
//                 console.log(`Member ${username} joined ${auctionId}`);

//                 // Add user to UsersInAuction array for the auctionId
//                 if (!UsersInAuction[auctionId]) {
//                     UsersInAuction[auctionId] = [];
//                 }
//                 UsersInAuction[auctionId].push({
//                     userId: activeUserId,
//                     name: username,
//                     email: useremail,
//                 });

//                 // Emit an event to update the UI with the updated list of users in the auction room
//                 auctionNamespace.to(auctionId).emit("updateUsersInAuction", {
//                     username,
//                     users: UsersInAuction[auctionId],
//                     added: true,
//                 });
//             } else {
//                 console.log(`Member ${username} is already in ${auctionId}`);
//             }
//         }
//     );

//     socket.on("sendMessage", (room, message) => {
//         auctionNamespace.to(room).emit("message", message);
//         console.log(`Message sent to room ${room}: ${message}`);
//     });
//     socket.on("disconnect", () => {
//         // Remove the user from UsersInAuction for this auction room
//         console.log(activeUserId);
//         if (UsersInAuction[auctionId]) {
//             // Find the disconnected user and get their username
//             const disconnectedUser = UsersInAuction[auctionId].find(
//                 (user) => user.userId === activeUserId
//             );
//             const disconnectedUsername = disconnectedUser
//                 ? disconnectedUser.name
//                 : "";

//             // Filter out the disconnected user
//             UsersInAuction[auctionId] = UsersInAuction[auctionId].filter(
//                 (user) => user.userId !== activeUserId
//             );

//             // Emit an event to update the UI with the updated list of users in the auction room
//             auctionNamespace.to(auctionId).emit("updateUsersInAuction", {
//                 username: disconnectedUsername,
//                 users: UsersInAuction[auctionId],
//                 added: false,
//             });
//         }
//     });
// });
// Define variables outside the auctionNamespace.on("connection", ...) callback
let auctionId;
let activeUserId;

auctionNamespace.on("connection", (socket) => {
    // console.log("User Joined auction : ", socket.id);

    socket.on(
        "joinAuctionRoom",
        ({ activeUserId: userId, auctionId: roomId, username, useremail }) => {
            // console.log(`Member ${userId} joined ${roomId}`);
            auctionId = roomId;
            activeUserId = userId;

            // Check if the user is already in the room
            const isUserInRoom =
                UsersInAuction[auctionId] &&
                UsersInAuction[auctionId].find(
                    (user) => user.userId === activeUserId
                );

            if (!isUserInRoom) {
                socket.join(auctionId);
                // console.log(`Member ${username} joined ${auctionId}`);

                // Add user to UsersInAuction array for the auctionId
                if (!UsersInAuction[auctionId]) {
                    UsersInAuction[auctionId] = [];
                }
                UsersInAuction[auctionId].push({
                    userId,
                    name: username,
                    email: useremail,
                });
                // Emit an event to update the UI with the updated list of users in the auction room
                auctionNamespace.to(auctionId).emit("updateUsersInAuction", {
                    username,
                    users: UsersInAuction[auctionId],
                    added: true,
                });
            } else {
                // console.log(`Member ${username} is already in ${auctionId}`);
            }
        }
    );

    socket.on("sendMessage", (room, message) => {
        auctionNamespace.to(room).emit("message", message);
        // console.log(`Message sent to room ${room}: ${message}`);
    });

    socket.on("disconnect", () => {
        // Remove the user from UsersInAuction for this auction room
        if (UsersInAuction[auctionId]) {
            // Find the disconnected user and get their username
            const disconnectedUser = UsersInAuction[auctionId].find(
                (user) => user.userId === activeUserId
            );
            const disconnectedUsername = disconnectedUser
                ? disconnectedUser.name
                : "";

            // Filter out the disconnected user
            UsersInAuction[auctionId] = UsersInAuction[auctionId].filter(
                (user) => user.userId !== activeUserId
            );

            // Emit an event to update the UI with the updated list of users in the auction room
            auctionNamespace.to(auctionId).emit("updateUsersInAuction", {
                username: disconnectedUsername,
                users: UsersInAuction[auctionId],
                added: false,
            });
        }
    });
});

server.listen(port);
