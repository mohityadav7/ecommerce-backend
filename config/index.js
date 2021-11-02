const dbConfig = require('./db.config');

module.exports = {
    port: process.env.PORT || 3000,
    db: dbConfig,
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
};
