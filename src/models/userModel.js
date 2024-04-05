const mongoose = require('mongoose');

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
}, {
    timestamps: true, // auto handle timestamp
    strict: false // menambah field secara dinamis
})

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;