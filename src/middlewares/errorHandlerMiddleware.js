const winstonConfig = require('../../config/logging/winstonConfig');
const status = require('../helpers/statusHelper');

const errorHandler = (err, req, res, next) => {
    winstonConfig.error({
		message: err.message,
		stack: err.stack,
		name: err.name,
		method: req.method,
		originalUrl: req.originalUrl,
		originalErr: err
	})
	let message = err.message;
	let statusCode = status.statusCode.bad
	if (err.statusCode) {
		statusCode = err.statusCode
	}
	// default error message ketika uncaught error terkait type error
	if (err.name === 'TypeError') {
		message = 'Something went wrong [code 1000]'
		statusCode = status.statusCode.error
	}
		// default error message ketika uncaught error terkait reference error
	if (err.name === 'ReferenceError') {
		message = 'Something went wrong [code 1001]'
		statusCode = status.statusCode.error
	}
	res.status(statusCode).json(status.errorMessage(message));
}

module.exports = errorHandler;