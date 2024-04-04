const mongoose = require('mongoose');

// Membuat skema user dengan index userName
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    accountNumber: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    emailAddress: {
        type: String,
        unique: true,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    identityNumber: {
        type: String,
        index: true,
        unique: true,
        required: true
    }
}, { timestamps: true })

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;