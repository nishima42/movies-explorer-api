const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { handleNotFound } = require('../controllers/errors');

router.use('/users', users);
router.use('/movies', movies);
router.use('*', handleNotFound);

module.exports = router;
