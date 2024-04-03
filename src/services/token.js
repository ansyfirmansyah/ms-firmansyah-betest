const jwt = require("jsonwebtoken");
const moment = require("moment");

const service = {};

service.createToken = async (user) => {
    let token = jwt.sign(
        {
            userName: user
        },
        process.env.JWT_TOKEN_KEY,
        {
            expiresIn: process.env.JWT_EXPIRATION,
            algorithm: "HS512"
        }
    );
    return {
        token: token,
        expiresIn: process.env.JWT_EXPIRATION
    };
};

module.exports = service;