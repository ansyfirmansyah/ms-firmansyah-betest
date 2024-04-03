const { Model } = require('mongoose');
class BaseRepository {
    constructor(model) {
        if (!(model.prototype instanceof Model)) {
            throw new Error('Invalid model provided');
        }
        this.model = model;
    }

    async create(data) {
        try {
            const newItem = new this.model(data);
            return await newItem.save();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter) {
        try {
            return await this.model.find(filter);
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndUpdate(id, updateData) {
        try {
            return await this.model.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndDelete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BaseRepository;