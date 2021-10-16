const mongoose = require('mongoose');
const User = require('../models/User');

const DB_URI = process.env.DB_URI;

module.exports = {
    connect: () => {
        mongoose.connect(DB_URI, (err) => {
            if (err) console.error(err);
            else console.log('mongodb connected');
        });
    },
};
