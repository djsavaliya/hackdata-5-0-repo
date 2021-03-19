const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
})

const User = new mongoose.model("Users", userSchema);

module.exports = User;