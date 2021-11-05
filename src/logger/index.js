const developmentLogger = require('./dev.logger');
const productionLogger = require('./prod.logger');
const config = require('../config');

let logger = null;
if (config.env === 'production') {
    logger = productionLogger;
} else {
    logger = developmentLogger;
}

module.exports = logger;
