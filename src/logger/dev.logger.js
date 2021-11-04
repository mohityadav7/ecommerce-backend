const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, printf, colorize, label } = format;

const logFormat = printf(({ level, message, timestamp, stack, label }) => {
    return `[${timestamp}] [${level}]${label ? ` [${label}]` : ''}: ${
        stack || message
    }`;
});

module.exports = createDevelopmentLogger = (tag) => {
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp({
                format: 'DD-MM-YYYY HH:mm:ss',
            }),
            label({ label: tag }),
            colorize(),
            errors({ stack: true }),
            logFormat
        ),
        transports: [new transports.Console()],
    });
};
