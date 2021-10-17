/**
 * /services/user.service.js
 *
 * @description Service file for user operations. All database operations
 * related to users are performed here.
 */

const User = require('../models/user.model');

module.exports = {
    createUser: async (reqBody) => {
        const { name, email, phone, pwd: password } = reqBody;
        const user = new User({ name, email, phone, password });
        try {
            const newUser = await user.save();
            console.log(newUser);
            return { user: newUser };
        } catch (err) {
            console.error('error saving user:', err.message);
            return { errors: err.errors };
        }
    },
};
