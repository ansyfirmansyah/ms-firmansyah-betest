const jwt = require("jsonwebtoken");

const service = {};

// Fungsi untuk create token berdasarkan data user
service.createToken = async (username) => {
    let token = jwt.sign(
        {
            username: username
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