// Import Dependency
require('dotenv').config();
const express = require('express');
const db = require('../config/database/mongo');
const cache = require('../config/database/redis');
const logger = require('./middlewares/loggerMiddleware');
const status = require('./helpers/statusHelper');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./apidoc.json");

// Create variable
const app = express();
const port = process.env.PORT; // port aplikasi, nantinya akan pakai env

app.use('/api/info', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use(logger);
app.use(require("sanitize").middleware);
app.use(express.json({ limit: "5mb" }));
app.use("/api/v1/user-management", jwtMiddleware, userRoute);
app.use("/api/v1/auth", authRoute);

// Tes endpoint
app.get('/', (req, res) => {
    res.status(status.statusCode.success).
        json(status.successMessage('Tes Endpoint'));
})

app.use((req, res, next) => {
    res.status(status.statusCode.notfound).
        json(status.errorMessage('Not Found'));
});

app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Start di port ${port}`);
})