import express from "express";
import cors from "cors";
import moviesRouter from "./modules/movie/movies.routes.js";
import usersRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import { logger } from "./middleware/logger.js";

const app = express();

app.use("/static", express.static("public"));
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome.");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

export default app;
