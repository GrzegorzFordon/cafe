import { Server as SocketIOServer } from "socket.io";
import Lobby from "./lobby/lobby.js";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../shared/protocol.js";
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
    console.log(socket.rooms);
    for (const room in socket.rooms) {
      console.log(room);
      socket.to(room).emit(ServerToClientEvents.get("SendMessage"), data);
    }
    socket.rooms.forEach((element) => {
      // console.log(element);
      if (element === socket.id) return;
      this.server.to(element).emit(ServerToClientEvents.get("SendMessage"), data);
    });
    // server.emit(ServerToClientEvents.get("SendMessage"), data);
  }
  onJoinRoom(socket, data) {
    //change to see if the room exists, send error back otherwise
    socket.join(data.roomID);
    socket.emit(ServerToClientEvents.get("JoinRoom"), {
      message: `successfully joined room ${data.roomID}.}`,
      roomID: data.roomID,
    });
  }
  onCreateRoom(socket, data, callback) {
    console.log(`received request to create room from ${socket.id}`);
    try {
      const res = this.lobby.createRoom();
      socket.join(res.roomID);
      socket.leave("general"); //change to leave other rooms too (other than own id)
      this.broadcastLobbyChange();
      callback({ status: "ok", roomID: res.roomID });
    } catch (error) {
      console.log(error);
      callback({ status: "error" });
    }
  }

  init() {
    this.server.on("connection", async (socket) => {
      console.log(`User connected (${socket.id})`);

      //Add player to general room
      socket.join("general");

      socket.on(ClientToServerEvents.get("SendMessage"), (data) =>
        this.onSendMessage(socket, data),
      );

      socket.on(ClientToServerEvents.get("JoinRoom"), (data) =>
        this.onJoinRoom(socket, data),
      );

      socket.on(ClientToServerEvents.get("CreateRoom"), (data, callback) =>
        this.onCreateRoom(socket, data, callback),
      );

      socket.on("disconnect", () =>
        console.log(`User disconnected (${socket.id})`),
      );
    });
  }

  broadcastLobbyChange() {}
  broadcastRoomUpdate() {}
}

export default Socket;
