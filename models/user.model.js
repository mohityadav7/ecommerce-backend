/**
 * @description The schema definition for User
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    email: { type: String, index: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
