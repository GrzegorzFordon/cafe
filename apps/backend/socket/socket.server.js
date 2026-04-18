import { Server as SocketIOServer } from "socket.io";

function createWebSocketServer(httpServer) {
  const server = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  server.on("connection", async (socket) => {
    console.log(`User connected (${socket.id})`);

    socket.on("join_room", async (data) => {
      await socket.join(data);
    });

    socket.on("send_message", (data) => {
      // console.log(data);
      // data.message += " back at you.";
      server.emit("send_message", data);
      socket.to(data.room).emit(data.message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected (${socket.id})`);
    });
  });

  return server;
}

export default createWebSocketServer;
