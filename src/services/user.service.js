/**
 * /services/user.service.js
 *
 * @description Service file for user operations. All database operations
 * related to users are performed here.
 */

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports = {
    /**
     * Insert new user in database
     *
     * @param {Object} reqBody reqBody must contain user details
     * @returns {{errors: Object, user: Object}}
     */
    createUser: async (reqBody) => {
        const { name, email, phone, pwd: password } = reqBody;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, phone, password: passwordHash });
        try {
            const newUser = await user.save();
            console.log(newUser);
            return { user: newUser };
        } catch (err) {
            return { errors: err.errors };
        }
    },

    /**
     * Get all users
     *
     * @returns {{error: Object, users: Array<Object>}} List of all users
     */
    getAllUsers: async () => {
        try {
            const users = await User.find();
            console.log(users);
            return { users };
        } catch (error) {
            return { error };
        }
    },

    /**
     * Delete user by id and return the deleted user
     *
     * @param {Object} id
     * @returns {{error: Object, user: Object}}
     */
    deleteUserById: async (id) => {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            return { user: deletedUser };
        } catch (error) {
            return { error };
        }
    },

    /**
     * Update user by id
     *
     * @param {Object} id Id of user to be updated
     * @param {Object} userData Validate data of user to used for updating user info
     * @returns {{errors: Object, user: Object}}
     */
    updateUserById: async (id, userData) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(id, userData, {
                new: true,
                runValidators: true,
                context: 'query',
            });
            console.log(updatedUser);
            return { user: updatedUser };
        } catch (error) {
            return { errors: error.errors };
        }
    },

    /**
     * Authenticate user by email and password
     *
     * @param {string} email email of user
     * @param {string} password password of user
     * @returns {error: Object, user: Object}
     */
    authenticateUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return { error: 'Invalid email or password' };
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { error: 'Invalid email or password' };
            }
            return { user };
        } catch (error) {
            return { error };
        }
    },

    /**
     * Authenticate user by id
     *
     * @param {string} id id of user
     * @returns {error: Object, user: Object}
     */
    authenticateUserById: async (id) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return { error: 'Invalid user id' };
            }
            return { user };
        } catch (error) {
            return { error };
        }
    },
};
