/**
 * @description User controller that handles all the logic behind validating
 * request parameters, query, sending responses with correct codes. It interacts
 * with user service for database operations.
 */

const userService = require('../../services/user.service');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const errors = require('../../errors');
const logger = require('../../logger')('user.controller');

module.exports = {
    createUser: require('./createUser'),

    getAllUsers: async (req, res, next) => {
        const response = await userService.getAllUsers();
        if (response.error) {
            next(new errors.InternalServerError('Could not get users.'));
        } else {
            res.status(200).json(response.users);
        }
    },

    updateUserById: require('./updateUser'),

    login: async (req, res, next) => {
        logger.debug('login:: req.body:', req.body);
        const { email, password } = req.body;
        if (!email || !password)
            next(
                new errors.BadRequestError('Email and password are required.')
            );
        const response = await userService.authenticateUser(email, password);
        logger.debug('login:: response:', response);

        if (response.error) {
            next(
                new errors.InternalServerError('Could not authenticate user.')
            );
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

    deleteUserById: async (req, res, next) => {
        const id = req.params.id;
        if (!id) {
            next(new errors.BadRequestError('Id is required.'));
            return;
        }
        const response = await userService.deleteUserById(id);
        logger.debug('deleteUserById:: response:', response);
        if (response.error) {
            next(new errors.InternalServerError('Could not delete user.'));
        } else if (!response.user) {
            next(new errors.NotFoundError('User not found.'));
        } else {
            const returnData = {
                name: response.user.name,
                email: response.user.email,
                phone: response.user.phone,
            };
            res.status(200).json(returnData);
        }
    },

    authenticateUser: async (req, res, next) => {
        const token = req.headers['authorization'];
        logger.debug('authenticateUser:: token:', token);
        if (!token) {
            next(new errors.UnauthorizedError('Token is required.'));
        }
        jwt.verify(token, config.jwt.secret, async (err, decoded) => {
            if (err) {
                return res
                    .status(200)
                    .json({ authenticated: false, msg: 'Invalid token.' });
            } else {
                logger.debug('decoded', decoded);
                const id = decoded.id;
                const response = await userService.authenticateUserById(id);
                logger.debug('authenticateUser:: response:', response);
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
