const mongoose = require("mongoose");

const RMessageSchema = new mongoose.Schema({
    messageID: String,
    guildID: String
});

module.exports = new mongoose.model("ReactionMessages", RMessageSchema);