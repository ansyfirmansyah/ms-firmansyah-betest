const status = require('../helpers/statusHelper');
const tokenService = require('../services/token');
const controller = {};

controller.post = async (req, res, next) => {
    try {
        const { user, password } = req.body
        if (user != process.env.DEFAULT_USER_JWT || password != process.env.DEFAULT_PASS_JWT) {
            return res.status(status.statusCode.unauthorized)
                .json(status.errorMessage('User dan/atau Password salah!'));
        }
        const token = await tokenService.createToken(user);
        res.status(status.statusCode.success).json(status.successMessage(token));
    } catch (error) {
        next(error)
    }
}
module.exports = controller;