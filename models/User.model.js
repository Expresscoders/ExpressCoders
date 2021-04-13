let mongoose = require('mongoose');

let User = mongoose.Schema({
    Email: String,
    Username: String,
    Password: String,
    Registered: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User);
