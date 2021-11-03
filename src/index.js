require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const config = require('./config');
const errors = require('./errors');

const app = express(); // init app
config.db.connect(); // connect db

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

routes(app); // set up routes

// error handling
app.use((error, req, res, next) => {
    console.log('error', error);
    res.status(error.status || 500).send(error);
});

// start listening
app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`);
});
