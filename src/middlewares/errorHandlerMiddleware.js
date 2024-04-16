const requestIP = require('request-ip');
const winstonConfig = require('../../config/logging/winstonConfig');
const status = require('../helpers/statusHelper');
const kafka = require('../../config/queue/kafkaConfig');

const errorHandler = async (err, req, res, next) => {
	const ipAddress = requestIP.getClientIp(req);
	const errorLog = {
		ipAddress,
		message: err.message,
		stack: err.stack,
		name: err.name,
		method: req.method,
		originalUrl: req.originalUrl,
		originalErr: err
	}
    winstonConfig.error(errorLog);
	// publish error log ke kafka
	await kafka.produce(process.env.KAFKA_TOPIC, [{
		key: "error-log",
		value: JSON.stringify(errorLog)
	}])
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