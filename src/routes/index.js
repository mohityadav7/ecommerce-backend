/**
 * @description This is main entry point for all routes. All routes go through
 * here.
 */

module.exports = (app) => {
    app.use('/api/v1/users', require('./user.routes'));
};
