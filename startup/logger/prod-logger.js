const { createLogger, transports, format, level } = require('winston');
const { combine, timestamp, errors, json } = format;

function buildProdLogger() {

    return createLogger({
        format: combine(
            errors({ stack: true }),
            timestamp(),
            json(),
        ),
        level: 'error',
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({ filename: `${__dirname}/../../logs/prodlogs.log` }),
        ]
    });
}
const prodLogger = buildProdLogger();
// both internally kill the node process
prodLogger.exceptions.handle(
    new transports.File({ filename: `${__dirname}/../../logs/prod/rejections.log` }))

prodLogger.rejections.handle(
    new transports.File({ filename: `${__dirname}/../../logs/prod/exceptions.log` }))



module.exports = prodLogger;

