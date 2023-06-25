require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

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
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');
const { limiter } = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(cors);

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.post('/signout', logout);

app.use('/api', router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
