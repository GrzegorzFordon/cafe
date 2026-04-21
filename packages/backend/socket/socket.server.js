import { Server as SocketIOServer } from "socket.io";
import getRandomRoomCode from "./rooms/roomsManager.js";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../shared/protocol.js";

const createWebSocketServer = (httpServer) => {
  const server = new SocketIOServer(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://192.168.2.115:5173"],
      methods: ["GET", "POST"],
    },
  });

  // HANDLER FUNCTIONS

  const onJoinRoom = async (socket, data) => {
    await socket.join(data.roomID);
    socket.emit(ServerToClientEvents.get("JoinRoom"), {
      message: `successfully joined room ${data.roomID}. Also here is a random ID: ${getRandomRoomCode()}`,
      roomID: data.roomID,
    });
  };

  const onSendMessage = (socket, data) => {
    console.log(socket.rooms);
    for (const room in socket.rooms) {
      console.log(room);
      socket.to(room).emit(ServerToClientEvents.get("SendMessage"), data);
    }
    socket.rooms.forEach((element) => {
      console.log(element);
      if (element === socket.id) return;
      server.to(element).emit(ServerToClientEvents.get("SendMessage"), data);
    });
    // server.emit(ServerToClientEvents.get("SendMessage"), data);
  };

  // WIRE UP

  server.on("connection", async (socket) => {
    console.log(`User connected (${socket.id})`);

    //Add player to general room
    socket.join("general");

    socket.on(ClientToServerEvents.get("JoinRoom"), (data) =>
      onJoinRoom(socket, data),
    );

    socket.on(ClientToServerEvents.get("SendMessage"), (data) =>
      onSendMessage(socket, data),
    );

    socket.on("disconnect", () =>
      console.log(`User disconnected (${socket.id})`),
    );
  });
};

//OWN SERVERSIDE EMITTERS

export default createWebSocketServer;
