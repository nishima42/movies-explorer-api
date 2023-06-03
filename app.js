require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { login } = require('./controllers/login');
const { logout } = require('./controllers/logout');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);
app.post('/signout', logout);

app.use(auth);

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
