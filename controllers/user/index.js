/**
 * @description User controller that handles all the logic behind validating
 * request parameters, query, sending responses with correct codes. It interacts
 * with user service for database operations.
 */

const userService = require('../../services/user.service');

module.exports = {
    createUser: require('./createUser'),

    getAllUsers: async (req, res) => {
        const response = await userService.getAllUsers();
        console.log('getAllUsers:: response:', response);
        if (response.error) {
            res.status(500).json({ msg: 'Could not get users.' });
        } else {
            res.status(200).json(response.users);
        }
    },

    updateUserById: require('./updateUser'),

    authenticateUser: (req, res) => {
        res.status(500).send('todo');
    },

    deleteUserById: async (req, res) => {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ msg: 'Id not present in request params' });
            return;
        }
        const response = await userService.deleteUserById(id);
        console.log('deleteUserById:: response:', response);
        if (response.error) {
            res.status(400).json({ msg: `Invalid id ${id}` });
        } else if (!response.user) {
            res.status(410).json({ msg: `No user with id ${id}` });
        } else {
            res.status(200).json(response.user);
        }
    },
};
