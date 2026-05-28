import "dotenv/config";
import http from "http";
import { logEvents } from "./middleware/logger.js";
// import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";

// import createWebSocketServer from "./socket/socket.server.js";
import app from "./app.js";
import Socket from "./socket/socket.js";

const PORT = process.env.PORT || 3500;

const httpServer = http.createServer(app);
// createWebSocketServer(httpServer);
const socket = new Socket(httpServer);
socket.init();

const connectDB = async () => {
  console.log("connecting to atlas");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test123",
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();

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

// httpServer.listen(PORT, () => {
//   console.log("Server is running");
// }
// );
