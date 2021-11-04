const { createLogger, format, transports } = require('winston');
const { timestamp, combine, errors, label, json } = format;

module.exports = createProductionLogger = (tag) => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            label({ label: tag }),
            errors({ stack: true }),
            json()
        ),
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new transports.File({
                filename: 'logs/error.log',
                level: 'error',
            }),
            new transports.File({
                filename: 'logs/combined.log',
                level: 'info',
            }),
        ],
    });
};
