import "dotenv/config";
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import path from "path";
import moviesRouter from "./routes/movies.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import { logEvents, logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 3500;

app.use("/static", express.static("public"));
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected (${socket.id})`);

  socket.on("send_message", (data) => {
    console.log(data);
    data.message += " back at you.";
    io.emit("send_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected (${socket.id})`);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome.");
});

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

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
