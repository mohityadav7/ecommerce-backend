const mongoose = require('mongoose');
const logger = require('../logger')('db.config');

const DB_URI = process.env.DB_URI;

module.exports = {
    connect: () => {
        mongoose.connect(DB_URI, (err) => {
            if (err) logger.error(err);
            else logger.info('MongoDB connected');
        });
    },
};
