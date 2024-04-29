const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    ID: String,
    urls: [String]
});
const Photo = mongoose.model('Photo', photoSchema, 'Photo');

module.exports = Photo;
