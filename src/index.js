// Import Dependency
require('dotenv').config();
const express = require('express');
const db = require('../config/database/mongo');
const logger = require('./middlewares/loggerMiddleware');
const status = require('./helpers/statusHelper');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

// Create variable
const app = express();
const port = process.env.PORT; // port aplikasi, nantinya akan pakai env

app.use(logger);
app.use(errorHandler);

// Tes endpoint
app.get('/', (req, res) => {
    res.status(status.statusCode.success).
        json(status.successMessage('Tes Endpoint'));
})

app.use((req, res, next) => {
    res.status(status.statusCode.notfound).
        json(status.errorMessage('Not Found'));
});


// Start server
app.listen(port, () => {
    console.log(`Start di port ${port}`);
})