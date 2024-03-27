// const socketio = require("socket.io");

// const chatHandler = (server) => {
//     const io = socketio(server);

//     io.on("connection", (socket) => {
//         console.log(`User Conneced ${socket.id}`);

//         socket.on("send-message", (data) => {
//             console.log(data);
//             const messageWithSocketId = {
//                 socketId: socket.id,
//                 message: data.message,
//             };
//             io.emit("recieved", messageWithSocketId);
//         });

//         socket.on("disconnect", () => {
//             console.log(`Socket disconnected: ${socket.id}`);
//         });
//     });
// };
// module.exports = chatHandler;
