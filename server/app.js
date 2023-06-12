const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

app
    .use(bodyParser.json())
    .use(cors());

sequelize.initdb();


app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});