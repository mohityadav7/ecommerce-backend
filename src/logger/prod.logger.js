const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, printf, label } = format;

const logFormat = printf(({ level, message, timestamp, stack, label }) => {
    return `[${timestamp}] [${level}]${label ? ` [${label}]` : ''}: ${
        stack || message
    }`;
});

module.exports = createProductionLogger = (tag) => {
    return createLogger({
        level: 'info',
        // format: combine(
        //     timestamp(),
        //     label({ label: tag }),
        //     errors({ stack: true }),
        //     json()
        // ),
        format: combine(
            timestamp({
                format: 'DD-MM-YYYY HH:mm:ss',
            }),
            label({ label: tag }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            // new transports.File({
            //     filename: 'logs/error.log',
            //     level: 'error',
            // }),
            // new transports.File({
            //     filename: 'logs/combined.log',
            //     level: 'info',
            // }),
            new transports.Console(),
        ],
    });
};
