import { Server as SocketIOServer } from "socket.io";
import getRandomRoomCode from "./rooms/roomsManager.js";

function createWebSocketServer(httpServer) {
  const server = new SocketIOServer(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://192.168.2.115:5173"],
      methods: ["GET", "POST"],
    },
  });

  server.on("connection", async (socket) => {
    console.log(`User connected (${socket.id})`);

    socket.on("join_room", async (data) => {
      await socket.join(data.roomID);
      console.log(data);
      socket.emit("join_room", {
        message: `successfully joined room ${data.roomID}. Also here is a random ID: ${getRandomRoomCode()}`,
        roomID: data.roomID,
      });
    });

    socket.on("send_message", (data) => {
      console.log(data);
      // // data.message += " back at you.";
      // server.emit("send_message", data);
      for (room in socket.rooms) server.to(room).emit("send_message", data);
      console.log(socket.rooms[0]);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected (${socket.id})`);
    });
  });

  return server;
}

export default createWebSocketServer;
