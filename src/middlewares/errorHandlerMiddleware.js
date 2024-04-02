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
	if (err.name === 'SequelizeDatabaseError') {
		message = 'Something went wrong [code 1001]'
		statusCode = status.statusCode.error
	}
	if (err.message?.includes('bind parameter') || err.message?.includes('WHERE parameter')) {
		message = 'Something went wrong [code 1001]'
		statusCode = status.statusCode.error
	}
	if (err.name === 'TypeError') {
		message = 'Something went wrong [code 1002]'
		statusCode = status.statusCode.error
	}
	if (err.name === 'ReferenceError') {
		message = 'Something went wrong [code 1003]'
		statusCode = status.statusCode.error
	}
	res.status(statusCode).json(status.errorMessage(message));
}

module.exports = errorHandler;