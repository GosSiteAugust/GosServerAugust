const mongoose = require('mongoose');

const UserMessagesScheme = new mongoose.Schema({
    ID: String,
    messages: [{ body: String, originatingAddress: String, timestamp: Date}]
});

const UserMessages = mongoose.model('UserMessages', UserMessagesScheme, 'UserMessages');

module.exports = UserMessages;
