import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import moviesRouter from "./modules/movie/movies.routes.js";
import usersRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import { logEvents, logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import createWebSocketServer from "./socket/socket.server.js";
import app from "./app.js"

// const app = express();

const PORT = process.env.PORT || 3500;

// app.use("/static", express.static("public"));
// app.use(logger);
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());


const httpServer = http.createServer(app);



// app.get("/", (req, res) => {
//   res.send("Welcome.");
// });

// app.use("/movies", moviesRouter);
// app.use("/users", usersRouter);
// app.use("/auth", authRouter);

// app.use(errorHandler);

connectDB();
const io = createWebSocketServer(httpServer);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  httpServer.listen(PORT, () => {
    console.log("Server is running");
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );
});
