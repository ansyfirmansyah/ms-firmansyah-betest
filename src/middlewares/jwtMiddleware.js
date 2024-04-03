const jwt = require("jsonwebtoken");
const status = require('../helpers/statusHelper');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
	const token = authHeader.split(' ')[1];
	if (!token) {
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
	try {
		jwt.verify(token, process.env.JWT_TOKEN_KEY, {
			algorithm: "HS512"
		}, (error) => {
			if (error) {
				if (error?.name == "TokenExpiredError") {
					return res.status(status.statusCode.unauthorized).json(status.expiredToken());
				}
				return res.status(status.statusCode.unauthorized).json(status.invalidToken());
			} else {
				next();
			}
		})
	} catch (err) {
		console.log(err);
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
}

module.exports = verifyToken;