// userRepository.js
const UserModel = require('../models/userModel');
const BaseRepository = require('./baseRepostory');

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }

    // Jika dibutuhkan, bisa ditambahkan function spesifik untuk class User
}

module.exports = UserRepository;