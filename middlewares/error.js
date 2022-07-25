import logger from '../startup/logger/index';

module.exports = function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(500).json({
        message: err.message
    })
}