const redisClient = require('../../config/database/redis');
const status = require('../helpers/statusHelper');
const helper = require('../helpers/globalHelper');
const UserRepository = require('../repositories/userRepository');
const controller = {};

// Inisialisasi User Repository untuk interaksi dengan DB
const userRepository = new UserRepository();

controller.getAll = async (req, res, next) => {
    try {
        const user = await userRepository.findAll(req.query);
        const redisKey = helper.getRedisKeyByReqQuery(req.query);
        // simpan data di redis
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
        // simpan data di redis
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
        const redisKey = helper.getRedisKeyByReqQuery(req.query);
        // hapus data di redis
        if (user) {
            redisClient.del(redisKey);
        }
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.put = async (req, res, next) => {
    try {
        const user = await userRepository.findByIdAndUpdate(req.params.id, req.body)
        const redisKey = helper.getRedisKeyByReqQuery(req.query);
        const redisKeyOne = `userId:${req.params.id}`
        // hapus data di redis
        if (user) {
            redisClient.del(redisKey);
            redisClient.del(redisKeyOne);
        }
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}

controller.delete = async (req, res, next) => {
    try {
        const user = await userRepository.findByIdAndDelete(req.params.id)
        const redisKey = helper.getRedisKeyByReqQuery(req.query);
        const redisKeyOne = `userId:${req.params.id}`
        // hapus data di redis
        if (user) {
            redisClient.del(redisKey);
            redisClient.del(redisKeyOne);
        }
        res.status(status.statusCode.success).json(status.successMessage(user));
    } catch (error) {
        next(error)
    }
}
module.exports = controller;