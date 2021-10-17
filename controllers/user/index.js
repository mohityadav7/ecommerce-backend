/**
 * @description User controller that handles all the logic behind validating
 * request parameters, query, sending responses with correct codes. It interacts
 * with user service for database operations.
 */

module.exports = {
    createUser: require('./createUser'),

    getAllUsers: (req, res) => {
        res.send('todo');
    },

    updateUser: (req, res) => {
        res.send('todo');
    },

    authenticateUser: (req, res) => {
        res.send('todo');
    },

    deleteUser: (req, res) => {
        res.send('todo');
    },
};
