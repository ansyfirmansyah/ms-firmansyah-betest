const redisClient = require('../../config/database/redis');
const status = require('../helpers/statusHelper');
const helper = require('../helpers/globalHelper');
const UserRepository = require('../repositories/userRepository');
const controller = {};

const userRepository = new UserRepository();

controller.getAll = async (req, res, next) => {
    try {
        const user = await userRepository.findAll(req.query);
        const redisKey = helper.getRedisKeyByReqQuery(req.query);
        // simpan di redis
        if (user) {
            redisClient.setEx(redisKey, 120, JSON.stringify(user), (err) => {
                if (err) {
                    console.error('Gagal menyimpan data di cache:', err);
                } else {
                    console.log('Data pengguna disimpan di cache.');
                }
            })
        }
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.get = async (req, res, next) => {
    try {
        const user = await userRepository.findById(req.params.id)
        const redisKey = `userId:${req.params.id}`
        // simpan di redis
        if (user) {
            redisClient.setEx(redisKey, 120, JSON.stringify(user), (err) => {
                if (err) {
                    console.error('Gagal menyimpan data di cache:', err);
                } else {
                    console.log('Data pengguna disimpan di cache.');
                }
            })
        }
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