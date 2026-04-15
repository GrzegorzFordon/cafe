import express from "express";
import { usersController } from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getUser)
//   .post(usersController.createMovie)
//   .patch(usersController.updateMovie)
//   .delete(usersController.deleteMovie);

export default router;
