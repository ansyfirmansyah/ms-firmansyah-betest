const redis = require('redis');

// Inisialisasi koneksi Redis
const redisClient = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
        reconnectStrategy: function(retries) {
            if (retries > 20) {
                console.log("Too many attempts to reconnect. Redis connection was terminated");
                return new Error("Too many retries.");
            } else {
                return retries * 500;
            }
        }
    },
    connectTimeout: 10000 // in milliseconds
});

// Tangani kesalahan koneksi
redisClient.on('error', (err) => {
    console.error('Koneksi Redis bermasalah:', err);
});

// Tangani ketika koneksi berhasil
redisClient.on('connect', () => {
    console.log('Koneksi Redis berhasil.');
});

redisClient.connect();

module.exports = redisClient;