import express from "express";
import { userController } from "./user.controller.js";
import verifyJWT from "../../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(userController.getUser)
//   .post(usersController.createMovie)
//   .patch(usersController.updateMovie)
//   .delete(usersController.deleteMovie);

export default router;
