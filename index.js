require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.routes');

const app = express(); // init app
require('./config/db.config').connect(); // connect db

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

routes(app); // set up routes

app.get('*', (req, res) => {
    res.status(404).send('404');
});

// start listening
app.listen(process.env.PORT, () => {
    console.log(`listening at http://localhost:${process.env.PORT}`);
});
