const mongoose = require("mongoose");

const activechatschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to userdata schema
        ref: "userdata", // Collection name of the userdata schema
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "userdata", // Collection name of the userdata schema
    },
});

const activechat = new mongoose.model("activechat", activechatschema);

module.exports = activechat;
