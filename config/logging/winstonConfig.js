const winston = require('winston');
const options = {
    console: {
        json: true,
        colorize: true,
        level: 'info',
        handleExceptions: true
    }
}

const winstonConfig = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.simple(),
        winston.format.printf((data) => {
            if (data.name === 'TypeError') {
                return `${data.timestamp} | ${data.level.toUpperCase()} | ${data.method} | ${data.originalUrl} | ${data.stack}`
            } else if (data.name === 'ReferenceError') {
                return `${data.timestamp} | ${data.level.toUpperCase()} | ${data.method} | ${data.originalUrl} | ${data.stack}`
            } else if (data.name === 'Error') {
                return `${data.timestamp} | ${data.level.toUpperCase()} | ${data.method} | ${data.originalUrl} | ${data.stack}`
            } else {
                if (typeof data.message === Object || typeof data.message == 'object') {
                    return `${data.timestamp} | ${data.level.toUpperCase()} | ${data.message.method} | ${data.message.originalUrl} | ${data.message.originalErr}`
                } else {
                    return `${data.timestamp} | ${data.level.toUpperCase()} | ${data.message}`
                }
            }
        }),
        winston.format.colorize()
    ),
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
})

module.exports = winstonConfig;