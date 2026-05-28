import "dotenv/config";
import http from "http";
import { logEvents } from "./middleware/logger.js";
import getInstance from "./config/dbConn.js";
import app from "./app.js";
// import Socket from "./socket/socket.js";

const PORT = process.env.PORT || 3500;

const httpServer = http.createServer(app);

// const socket = new Socket(httpServer);
// socket.init();

const mongooseInstance = getInstance();

mongooseInstance.connection.once("open", () => {
  console.log("Connected to MongoDB");
  httpServer.listen(PORT, () => {
    console.log("Server is running");
  });
});

mongooseInstance.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log",
  );
});

