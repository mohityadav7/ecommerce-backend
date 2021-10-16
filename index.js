require('dotenv').config();
const express = require('express');
const dbConfig = require('./config/dbConfig');

const app = express();
dbConfig.connect();

app.get('/', (req, res) => {
    res.send('hi there');
});

app.listen(process.env.PORT, () => {
    console.log(`listening at http://localhost:${process.env.PORT}`);
});
