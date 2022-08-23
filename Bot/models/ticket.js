const mongoose = require("mongoose"), AutoIncrement = require("mongoose-sequence")(mongoose);

const ticketSchema = new mongoose.Schema({
    id: Number,
    channelID: String,
    guildID: String,
    closed: Boolean,
    UserID: Number
});

ticketSchema.plugin(AutoIncrement, {inc_field: "id"});

module.exports = new mongoose.model("tickets", ticketSchema);