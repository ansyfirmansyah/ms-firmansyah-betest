const { Model } = require('mongoose');
class BaseRepository {
    constructor(model) {
        if (!(model.prototype instanceof Model)) {
            throw new Error('Invalid model provided');
        }
        this.model = model;
    }

    async create(data) {
        const newItem = new this.model(data);
            return await newItem.save();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findAll(filter) {
        return await this.model.find(filter).limit(10);
    }

    async findByIdAndUpdate(id, updateData) {
        return await this.model.findByIdAndUpdate(id, updateData, { new: true });
    }

    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;