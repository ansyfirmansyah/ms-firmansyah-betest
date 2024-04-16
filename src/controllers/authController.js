const status = require('../helpers/statusHelper');
const ErrorResponse = require('../helpers/errorResponse');
const tokenService = require('../services/token');
const activityLogService = require('../services/activityLog');
const controller = {};

controller.post = async (req, res, next) => {
    try {
        const { username, password } = req.body
        // kondisi saat ini, user dan password di-set di env
        if (username != process.env.DEFAULT_USER_JWT || password != process.env.DEFAULT_PASS_JWT) {
            throw new ErrorResponse("User dan/atau Password salah!", status.statusCode.unauthorized)
        }
        // buat token baru
        const token = await tokenService.createToken(username);
        // publish log ke kafka
        await activityLogService.produceLog(req, {action: 'login', username: username});
        res.status(status.statusCode.success).json(status.successMessage(token));
    } catch (error) {
        next(error)
    }
}
module.exports = controller;