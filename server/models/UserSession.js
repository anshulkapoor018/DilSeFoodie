const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
    userID: {
        type: Number,
        default: -1
    },

    timestamp: {
        type: Date,
        default: Date.now()
    },

    isDeleted: {
        type: Boolean,
        default: fasle
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);