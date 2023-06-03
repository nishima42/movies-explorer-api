const movies = require('express').Router();

const {
  createMovie,
  getMoviesByUser,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

movies.get('/', getMoviesByUser);
movies.post('/', createMovieValidation, createMovie);
movies.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movies;
