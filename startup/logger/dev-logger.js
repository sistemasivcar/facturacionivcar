const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

function buildDevLogger() {

    return createLogger({
        format: combine(
            colorize(),
            errors({ stack: true }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        level: 'debug',
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console()
        ]
    });
}

const devlogger = buildDevLogger();
// both internally kill the node process
devlogger.exceptions.handle(
    new transports.Console({ colorize: true }))

devlogger.rejections.handle(
    new transports.Console({ colorize: true }))

module.exports = devlogger;



