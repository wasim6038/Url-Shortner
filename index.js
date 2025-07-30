const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectToDB = require('./connect');
const PORT = process.env.PORT || 3000;

const staticRoute = require('./routes/staticRoute')
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const { checkForAuthentication, restrictTo } = require('./middleware/auth')

const app = express();

connectToDB();
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
