const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: String,
    photo: String,
    username: String,
    psw: String
});

module.exports = mongoose.model('Person', PersonSchema);