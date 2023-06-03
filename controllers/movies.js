const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const {
  movieNotFoundMessage,
  cannotDeleteMessage,
  movieDeletedMessage,
  CREATED,
} = require('../constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => Movie.findById(movie._id).populate('owner'))
    .then((movie) => res.status(CREATED).send({
      _id: movie._id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      owner: movie.owner,
    }))
    .catch(next);
};

module.exports.getMoviesByUser = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundMessage);
      }
      if (movie.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(cannotDeleteMessage);
      }
      Movie.findByIdAndDelete(req.params._id)
        .then(() => {
          res.send({ message: movieDeletedMessage });
        })
        .catch(next);
    })
    .catch(next);
};
