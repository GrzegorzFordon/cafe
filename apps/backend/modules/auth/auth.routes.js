import express from "express";
import { authController } from "./auth.controller.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/refresh").post(authController.refreshUser);

export default router;
