const status = {}

status.successMessage = (ress) => ({
    code: "01",
    status: true,
    message: "Success",
    data: ress,
});

status.errorMessage = (ress) => ({
    code: "02",
    status: false,
    message: "Error",
    data: ress,
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