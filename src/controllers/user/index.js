/**
 * @description User controller that handles all the logic behind validating
 * request parameters, query, sending responses with correct codes. It interacts
 * with user service for database operations.
 */

const userService = require('../../services/user.service');
const jwt = require('jsonwebtoken');
const config = require('../../config');

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

    login: async (req, res) => {
        console.log('login:: req.body:', req.body);
        const { email, password } = req.body;
        if (!email || !password)
            res.status(400).json({ msg: 'Please provide email and password.' });
        const response = await userService.authenticateUser(email, password);
        console.log('login:: response:', response);

        if (response.error) {
            res.status(500).json({ msg: 'Could not login.' });
        } else {
            const token = jwt.sign(
                { id: response.user._id },
                config.jwt.secret,
                {
                    expiresIn: config.jwt.expiresIn,
                }
            );
            const returnData = {
                token,
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
            };
            res.status(200).json(returnData);
        }
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
            const returnData = {
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
            };
            res.status(200).json(returnData);
        }
    },

    authenticateUser: async (req, res) => {
        const token = req.headers['authorization'];
        console.log('authenticateUser:: token:', token);
        if (!token) {
            res.status(400).json({ msg: 'Please provide token.' });
        }
        jwt.verify(token, config.jwt.secret, async (err, decoded) => {
            if (err) {
                return res
                    .status(200)
                    .json({ authenticated: false, msg: 'Invalid token.' });
            } else {
                console.log('decoded', decoded);
                const id = decoded.id;
                const response = await userService.authenticateUserById(id);
                console.log('authenticateUser:: response:', response);
                if (response.error) {
                    res.status(200).json({
                        authenticated: false,
                        msg: 'User not found.',
                    });
                } else {
                    const newToken = jwt.sign(
                        { id: response.user._id },
                        config.jwt.secret,
                        {
                            expiresIn: config.jwt.expiresIn,
                        }
                    );
                    const returnData = {
                        authenticated: true,
                        name: response.user.name,
                        email: response.user.email,
                        phone: response.user.phone,
                        token: newToken,
                    };
                    res.status(200).json(returnData);
                }
            }
        });
    },
};
