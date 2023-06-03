const movies = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', createMovie);
movies.delete('/:_id', deleteMovie);

module.exports = movies;
