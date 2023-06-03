const movies = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

movies.get('/', getMovies);
movies.post('/', createMovieValidation, createMovie);
movies.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movies;
