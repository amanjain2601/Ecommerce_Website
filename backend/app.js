const express = require('express');
const middleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

//Middle ware for error
app.use(middleware);

module.exports = app;
