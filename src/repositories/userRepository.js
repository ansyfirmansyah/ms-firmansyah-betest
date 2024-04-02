// userRepository.js
const indexModel = require('../model/index');
const AbstractRepository = require('./abstractRepository');

class UserRepository extends AbstractRepository {
    constructor() {
        super(indexModel.User);
    }

    async findByEmail(email) {
        return await this.model.findOne({ emailAddress: email });
    }
}

module.exports = UserRepository;