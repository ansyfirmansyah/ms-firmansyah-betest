const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

// Membuat skema user dengan index userName
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
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
        unique: true,
        required: true
    }
}).index({
    userName: 1
})

// Tambahkan Base Model
UserSchema.add(BaseModel);

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;