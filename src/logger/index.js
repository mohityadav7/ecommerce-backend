const developmentLogger = require('./dev.logger');
const productionLogger = require('./prod.logger');

let logger = null;
if (process.env.NODE_ENV === 'production') {
    logger = productionLogger;
} else {
    logger = developmentLogger;
}

module.exports = logger;
