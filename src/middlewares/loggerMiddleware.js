const status = require('../helpers/statusHelper');
const moment = require('moment');
const winstonConfig = require('../../config/logging/winstonConfig');

const logger = (req, res, next) => {
    let appName = process.env.APP_NAME;
	let requestTime = new Date(Date.now());
	let request = {
		method: req.method,
		url: req.url,
		body: req.body
	};

	let tmp = res.send;
	res.send = function (data) {
		let executionTime = new Date() - requestTime + "ms";

		let response = {
			statusCode: res.statusCode,
			body: data && typeof data == Object ? JSON.parse(data) : data
		};

		let log = {
			appName,
			requestTime: moment(requestTime).format("yyyy-mm-dd HH:MM:ss"),
			executionTime,
			request,
			response
		};

        if ([status.statusCode.success, status.statusCode.created].includes(res.statusCode)) {
            winstonConfig.log("info", JSON.stringify(log));
        } else {
            winstonConfig.log("error", JSON.stringify(log));
        }

		tmp.apply(res, arguments);
	};
	next();
}

module.exports = logger;