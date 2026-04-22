import { Server as SocketIOServer } from "socket.io";
import Lobby from "./lobby/lobby.js";
// import {
//   ClientToServerEvents,
//   ServerToClientEvents,
// } from "../../shared/protocol.js";
class Socket {
  constructor(httpServer) {
    this.server = new SocketIOServer(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "http://192.168.2.115:5173"],
        methods: ["GET", "POST"],
      },
    });
    this.lobby = new Lobby();
  }
  onSendMessage(socket, data) {
    // console.log(socket.rooms);
    socket.rooms.forEach((element) => {
      if (element === socket.id) return;
      this.server.to(element).emit("chat:message", data);
    });
  }
  onJoinRoom(socket, data, ack) {
    console.log(`User ${socket.id} is trying to join Room ${data.roomID}`);
    try {
      //change to see if the room exists, send error back otherwise
      socket.join(data.roomID);
      // console.log(socket.rooms);
      ack?.({ status: "ok" });
    } catch (error) {
      console.log(error);
      ack?.({ status: "error" });
    }
  }
  onCreateRoom(socket, data, ack) {
    console.log(`Received request to create Room from User ${socket.id}`);
    try {
      const res = this.lobby.createRoom();
      socket.join(res.roomID);
      socket.leave("general"); //change to leave other rooms too (other than own id)
      this.broadcastLobbyChange();
      ack?.({ status: "ok", roomID: res.roomID });
    } catch (error) {
      console.log(error);
      ack?.({ status: "error" });
    }
  }

  init() {
    console.log("initializing websocket");
    this.server.on("connection", async (socket) => {
      console.log(`User connected (${socket.id})`);

      //Add player to general room
      socket.join("general");
      this.broadcastLobbyChange();

      socket.on("chat:message", (data) => this.onSendMessage(socket, data));

      socket.on("room:join", (data, ack) => this.onJoinRoom(socket, data, ack));

      socket.on("room:create", (data, ack) =>
        this.onCreateRoom(socket, data, ack),
      );

      socket.on("disconnect", () =>
        console.log(`User disconnected (${socket.id})`),
      );
    });
  }

  broadcastLobbyChange() {
    console.log("Broadcasting lobby changes");
    const rooms = this.lobby.getAllRooms();
    // console.log(rooms);
    this.server.emit("lobby:change", { rooms: rooms });
  }
  broadcastRoomUpdate() {}
}

export default Socket;
