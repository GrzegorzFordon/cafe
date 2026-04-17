import express from "express";
import { moviesController } from "./movie.controller.js";
import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

// router.use(verifyJWT);

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

export default router;
