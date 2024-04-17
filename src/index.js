require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

// init db dan worker
require('../config/database/mongo');
require('../config/database/redis');
require('./worker/activityLogConsumer');

const logger = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const status = require('./helpers/statusHelper');
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const apiDocumentation = require("./apidoc.json");

const app = express();
const port = process.env.PORT; // port aplikasi sesuai env

// Gunakan middleware Helmet untuk menambahkan header keamanan
app.use(helmet());
// Konfigurasi rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 100 // 100 permintaan maksimum dalam 1 menit
});
app.use(limiter);
app.use(logger);
app.use(require("sanitize").middleware);
app.use(express.json({ limit: "5mb" }));

app.use('/api/info', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("/api/v1/user-management", jwtMiddleware, userRoute);
app.use("/api/v1/auth", authRoute);

// endpoint untuk tes koneksi
app.get('/', (req, res) => {
    res.status(status.statusCode.success).
        json(status.successMessage('Test Endpoint'));
})

// endpoint default jika route tidak ada
app.use((req, res) => {
    res.status(status.statusCode.notfound).
        json(status.errorMessage('Not Found'));
});

app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Aplikasi berhasil running di port: ${port}`);
})