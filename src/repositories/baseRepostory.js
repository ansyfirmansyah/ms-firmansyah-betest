// abstractRepository.js
class BaseRepository {
    constructor(model) {
        if (new.target === BaseRepository) {
            throw new Error('Cannot instantiate BaseRepository directly');
        }
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findByField(fieldName, value) {
        return await this.model.findOne({ [fieldName]: value });
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async updateById(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }
}

module.exports = BaseRepository;