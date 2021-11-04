require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const config = require('./config');
const logger = require('./logger')('app');
const accessLogger = require('./logger/access.logger');

const app = express(); // init app
config.db.connect(); // connect db

// middlewares
app.use(accessLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

routes(app); // set up routes

// error handling
app.use((error, req, res, next) => {
    const err = { ...error };
    logger.error(error);
    res.status(err.status || 500).send(err);
});

// start listening
app.listen(config.port, () => {
    logger.info(`listening at http://localhost:${config.port}`);
});
