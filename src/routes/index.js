/**
 * @description This is main entry point for all routes. All routes go through
 * here.
 */

const errors = require('../errors');

module.exports = (app) => {
    app.use('/api/v1/users', require('./user.routes'));
    app.use('/api/v1/products', require('./product.routes'));
    app.get('*', (req, res, next) => {
        next(new errors.NotFoundError());
    });
};
