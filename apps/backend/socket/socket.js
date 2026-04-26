import { Server as SocketIOServer } from "socket.io";
import Lobby from "./lobby/lobby.js";
import {
  GameDTO,
  RoomDTO,
  PlayerDTO,
} from "../../../packages/shared/schemas/schemas.js";
import Games from "./game/games.js";

class Socket {
  constructor(httpServer) {
    this.server = new SocketIOServer(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "http://192.168.2.115:5173"],
        methods: ["GET", "POST"],
      },
    });
    this.lobby = new Lobby();
    this.games = new Games();
  }

  onSendMessage(socket, data) {
    // console.log(socket.rooms);
    socket.rooms.forEach((element) => {
      if (element === socket.id) return;
      this.server.to(element).emit("chat:message", data);
    });
  }

  onCreateRoom(socket, data, ack) {
    console.log(`Received request to create Room from User ${socket.id}`);
    try {
      const player = PlayerDTO.parse({ id: socket.id });
      const res = this.lobby.createRoom(player);
      // this.lobby.joinRoom(res, player);
      socket.join(res.roomID);
      socket.leave("general"); //change to leave other rooms too (other than own id)
      ack?.({
        status: "ok",
        message: "successfully created room",
        roomID: res.roomID,
      });
      this.broadcastRoomState(res.roomID);
    } catch (error) {
      console.log(error);
      ack?.({ status: "error" });
    }
  }

  onJoinRoom(socket, data, ack) {
    console.log(`User ${socket.id} is trying to join Room ${data.roomID}`);
    try {
      //change to see if the room exists, send error back otherwise

      const player = PlayerDTO.parse({ id: socket.id });
      const res = this.lobby.joinRoom(data.roomID, player);
      socket.join(data.roomID);
      // console.log(socket.rooms);

      ack?.({
        status: "ok",
        message: "successfully joined room",
        roomID: data.roomID,
      });
      // this.broadcastRoomUpdate(data.roomID);
    } catch (error) {
      console.log(error);
      ack?.({ status: "error" });
    }
  }

  onLeaveRoom(socket, data, ack) {
    console.log(`User ${socket.id} is trying to leave Room ${data.roomID}`);
    try {
      const player = PlayerDTO.parse({ id: socket.id });
      this.lobby.leaveRoom(data.roomID, player);
      socket.leave(data.roomID);

      ack?.({
        status: "ok",
        message: "successfully left room",
        roomID: "general",
      });
    } catch (error) {
      console.log(error);
      ack?.({ status: "error", error: error });
    }
  }

  onGameStart(socket, data, ack) {
    console.log(
      `User ${socket.id} is trying to start game in Room ${data.roomID}`,
    );
    this.lobby.startGameInRoom(data.roomID);
  }

  onGameActions(socket, data, ack) {
    //either sends the actions to the game manager
    //or it collects all actions for the turn, sorts them by speed, THEN sends that to the game manager
  }

  onGameFinish(socket, data, ack) {
    console.log(
      `User ${socket.id} is trying to finish game in Room ${data.roomID}`,
    );
    this.lobby.finishGameInRoom(data.roomID);
  }

  init() {
    console.log("initializing websocket");
    this.server.on("connection", async (socket) => {
      console.log(`User connected (${socket.id})`);

      socket.join("general");
      this.broadcastLobbyState();

      socket.on("chat:message", (data) => this.onSendMessage(socket, data));

      socket.on("room:create", (data, ack) => {
        this.onCreateRoom(socket, data, ack);
        this.broadcastLobbyState();
      });
      socket.on("room:join", (data, ack) => {
        this.onJoinRoom(socket, data, ack);
        this.broadcastRoomState(data.roomID);
      });
      socket.on("room:leave", (data, ack) => {
        this.onLeaveRoom(socket, data, ack);
        this.broadcastRoomState(data.roomID);
        this.broadcastLobbyState();
      });
      socket.on("room:start", (data, ack) => {
        this.onGameStart(socket, data, ack);
        this.broadcastRoomState(data.roomID);
        this.broadcastLobbyState();
      });
      socket.on("game:actions", (data, ack) => {
        this.onGameActions(socket, data, ack);
      });
      socket.on("game:finish", (data, ack) => {
        this.onGameFinish(socket, data, ack);
        this.broadcastRoomState(data.roomID);
      });

      socket.on("disconnecting", () => {
        // console.log(socket.rooms); // the Set contains at least the socket ID
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected (${socket.id})`);
      });
    });
  }

  broadcastLobbyState() {
    console.log("Broadcasting lobby state");
    const rooms = this.lobby.getAllRooms();
    this.server.emit("lobby:change", { rooms: rooms });
  }

  broadcastRoomState(roomID) {
    console.log(`Broadcasting Room state to Room ${roomID}`);
    const room = this.lobby.getRoomByID(roomID);
    // if (!room) throw new Error("room does not exist");
    if (!room) return;
    const result = RoomDTO.parse({
      id: roomID,
      hostID: "foo",
      players: room.players,
      status: room.status,
    });
    this.server.to(roomID).emit("room:change", result);
  }

  broadcastGameState(roomID, gameState) {
    console.log("Broadcasting game state");
    const result = GameDTO.parse({
      id: "gameID",
      roomID: roomID,
      hostID: "hostID",
    });

    this.server.to(roomID).emit("game:change", result);
  }
}

export default Socket;
