const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { connectMongoDb } = require('./connect');

const staticRoute = require('./routes/staticRoute')
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const { checkForAuthentication, restrictTo } = require('./middleware/auth')

const app = express();

connectMongoDb('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB Connected'));
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

module.exports = app;