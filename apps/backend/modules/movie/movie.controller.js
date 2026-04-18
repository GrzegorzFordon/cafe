import Movie from "./movie.model.js";

const getAllMovies = async (req, res) => {
  const movies = await Movie.find().limit(20).lean().exec();
  if (!movies) {
    return res.status(400).json({ message: "no movies found." });
  }

  res.json(movies);
};

const createMovie = async (req, res) => {
  const { title, description, year } = req.body;
  if (!title || !description || !year) {
    return res.status(400).json({ message: "All fields required" });
  }

  const duplicate = await Movie.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate title" });
  }

  const movieObject = { title, plot: description, year };
  const movie = await Movie.create(movieObject);

  if (movie) {
    res.status(201).json({ message: `New movie with title ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
};

const updateMovie = async (req, res) => {};

const deleteMovie = async (req, res) => {};

export const moviesController = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
