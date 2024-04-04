const status = {}

// struktur default ketika respon sukses dengan source langsung dari DB
status.successMessage = (ress) => ({
    code: "01",
    status: true,
    message: "Success",
    source: "db",
    data: ress,
});

// struktur default ketika respon sukses dengan source dari cache / redis
status.successMessageFromCache = (ress) => ({
    code: "01",
    status: true,
    message: "Success",
    source: "cache",
    data: ress,
});

status.errorMessage = (ress) => ({
    code: "02",
    status: false,
    message: "Error",
    data: ress,
});

status.invalidToken = () => ({
    code: "02",
    status: false,
    message: "invalid_token"
});

status.expiredToken = () => ({
    code: "02",
    status: false,
    message: "expired_token"
});

status.statusCode = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
    forbidden: 403,
};

module.exports = status;