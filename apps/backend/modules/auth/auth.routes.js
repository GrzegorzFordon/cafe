import express from "express";
import { authController } from "./auth.controller.js";

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/refresh").post(authController.refresh);

export default router;
