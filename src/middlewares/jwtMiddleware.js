const jwt = require("jsonwebtoken");
const status = require('../helpers/statusHelper');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	// cek bearer token di header request
	if (!authHeader) {
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
	const token = authHeader.split(' ')[1];
	// cek bearer token di header request
	if (!token) {
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
	try {
		// verify token sesuai key dan waktu berlaku
		jwt.verify(token, process.env.JWT_TOKEN_KEY, {
			algorithm: "HS512"
		}, (error, result) => {
			if (error) {
				if (error?.name == "TokenExpiredError") {
					return res.status(status.statusCode.unauthorized).json(status.expiredToken());
				}
				return res.status(status.statusCode.unauthorized).json(status.invalidToken());
			} else {
				// jika verified maka titipkan info username di request header
				req.headers["x-username"] = result.username;
				next();
			}
		})
	} catch (err) {
		console.error(err);
		return res.status(status.statusCode.unauthorized).json(status.invalidToken());
	}
}

module.exports = verifyToken;