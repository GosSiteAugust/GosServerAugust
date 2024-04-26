const mongoose = require('mongoose');

const HotLine_scheme = new mongoose.Schema({
    number: String,
});

const HotLine = mongoose.model('HotLine', HotLine_scheme, 'HotLine');

module.exports = HotLine;
