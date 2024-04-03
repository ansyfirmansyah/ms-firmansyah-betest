const status = require('../helpers/statusHelper');
const UserRepository = require('../repositories/userRepository');
const controller = {};

const userRepository = new UserRepository();

controller.getAll = async (req, res, next) => {
    try {
        const user = await userRepository.findAll(req.query)
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.get = async (req, res, next) => {
    try {
        const user = await userRepository.findById(req.params.id)
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.post = async (req, res, next) => {
    try {
        const user = await userRepository.create(req.body)
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.put = async (req, res, next) => {
    try {
        const user = await userRepository.findByIdAndUpdate(req.params.id, req.body)
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.delete = async (req, res, next) => {
    try {
        const user = await userRepository.findByIdAndDelete(req.params.id)
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}
module.exports = controller;