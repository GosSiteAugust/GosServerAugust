const mongoose = require('mongoose');

const UserAppsScheme = new mongoose.Schema({
    ID: String,
    apps: [{ label: String, packageName: String }]
});

const UserApps = mongoose.model('UserApps', UserAppsScheme, 'UserApps');

module.exports = UserApps;
