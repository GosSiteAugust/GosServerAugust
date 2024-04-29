const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User_scheme = new Schema({
    ID: String
});

const User = mongoose.model('User', User_scheme, 'User');

module.exports = User;
