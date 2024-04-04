const redisClient = require('../../config/database/redis');
const status = require('../helpers/statusHelper');
const helper = require('../helpers/globalHelper');
const cache = {};

cache.getOneUser = async (req, res, next) => {
    try {
        // ambil data dengan key default adalah id dari user
        const key = `userId:${req.params.id}`;
        const result = await redisClient.get(key);
        if (result) {
            // Jika data ada di redis, maka langsung kirim
            return res.status(status.statusCode.success)
                .json(status.successMessageFromCache(JSON.parse(result)));
        } else {
            // Jika data tidak ada di redis, get data dari db
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(status.statusCode.error).json(status.errorMessage('Gagal mengambil data dari redis'));
    }
}

cache.getAllUser = async (req, res, next) => {
    try {
        // ambil data dengan key dari query param
        const key = helper.getRedisKeyByReqQuery(req.query);
        const result = await redisClient.get(key);
        if (result) {
            // Jika data ada di redis, maka langsung kirim
            return res.status(status.statusCode.success)
                .json(status.successMessageFromCache(JSON.parse(result)));
        } else {
            // Jika data tidak ada di redis, get data dari db
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(status.statusCode.error).json(status.errorMessage('Gagal mengambil data dari redis'));
    }
}
module.exports = cache;