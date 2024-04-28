const messagedata = require("../../Models/messages");
const ActiveChat = require("../../Models/activechats");

const savechats = async (req, res) => {
    try {
        const { sender, reciever, message } = req.body;
        // console.log(sender);
        // console.log(reciever);
        // console.log(message);

        // Check if an active chat exists for the sender
        var existingChat = await ActiveChat.findOne({ user: sender });
        if (!existingChat) {
            // Create a new active chat if none exists
            const newActiveChat = new ActiveChat({
                user: sender,
                members: [reciever],
            });
            const savedActiveChat = await newActiveChat.save();
            // console.log("New active chat created:", savedActiveChat);
        } else {
            // If chat exists, check if receiver is present in members
            if (!existingChat.members.includes(reciever)) {
                // Add receiver to the members array if not already present
                existingChat.members.push(reciever);
                existingChat = await existingChat.save();
                // console.log("Receiver added to existing chat:", existingChat);
            }
        }
        // Check if an active chat exists for the receiver
        var existingChatReciever = await ActiveChat.findOne({ user: reciever });
        if (!existingChatReciever) {
            // Create a new active chat if none exists
            const newActiveChat = new ActiveChat({
                user: reciever,
                members: [sender],
            });
            const savedActiveChat = await newActiveChat.save();
        } else {
            // If chat exists, check if receiver is present in members
            if (!existingChatReciever.members.includes(sender)) {
                // Add receiver to the members array if not already present
                existingChatReciever.members.push(sender);
                existingChatReciever = await existingChatReciever.save();
                // console.log("Receiver added to existing chat:", existingChat);
            }
        }
        const chatmessage = { sender, receiver: reciever, message };
        const insertchat = new messagedata(chatmessage);
        const data = await insertchat.save();
        // console.log("saved message >>> ", data);

        return res.json({
            status: "success",
            message: "ok",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.json({ status: "error", message: "Internal server error" });
    }
};

module.exports = savechats;
