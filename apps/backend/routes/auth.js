import express from "express";
import { authController } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

//TODO
router.route("/refresh").post(authController.refreshUser);

export default router;
