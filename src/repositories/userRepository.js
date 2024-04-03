// userRepository.js
const UserModel = require('../models/userModel');
const BaseRepository = require('./baseRepostory');

class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email) {
        return await this.model.findOne({ emailAddress: email });
    }
}

module.exports = UserRepository;