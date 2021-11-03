require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const config = require('./config');

const app = express(); // init app
config.db.connect(); // connect db

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

routes(app); // set up routes

app.get('*', (req, res) => {
    res.status(404).send('404');
});

// start listening
app.listen(config.port, () => {
    console.log(`listening at http://localhost:${config.port}`);
});
