const redis = require('redis');

// Buka koneksi ke Redis
const redisClient = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
        reconnectStrategy: function(retries) {
            // Kondisi untuk membatasi retry koneksi
            if (retries > 20) {
                console.log("Too many attempts to reconnect. Redis connection was terminated");
                return new Error("Too many retries.");
            } else {
                return retries * 500;
            }
        }
    },
    connectTimeout: 10000 // timeout dalam detik
});

redisClient.on('error', (err) => {
    console.error('Koneksi Redis bermasalah:', err);
});

redisClient.on('connect', () => {
    console.log('Koneksi Redis berhasil.');
});

redisClient.connect();

module.exports = redisClient;