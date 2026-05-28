import { Server as SocketIOServer } from "socket.io";
import Lobby from "./lobby/lobby.js";
import { GameDTO, RoomDTO, PlayerDTO } from "@cafe/shared/schemas/schemas.js";
import { GAME_PHASES } from "@cafe/engine/config.js";
import _ from "lodash";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";

class Socket {
  constructor(httpServer) {
    this.server = new SocketIOServer(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "http://192.168.2.115:5173", "*"],
        methods: ["GET", "POST"],
      },
    });
    this.lobby = new Lobby();
  }

  onSendMessage(socket, data) {
    socket.rooms.forEach((element) => {
      if (element === socket.id) return;
      this.server.to(element).emit("chat:message", data);
    });
  }

  onCreateRoom(socket, data, ack) {
    console.log(
      `[Socket (Server)] Received request to create Room from User ${socket.id}`,
    );
    try {
      const player = PlayerDTO.parse({ id: socket.id });
      const res = this.lobby.createRoom(player);
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
    console.log(
      `[Socket (Server)] User ${socket.id} is trying to join Room ${data.roomID}`,
    );
    try {
      const player = PlayerDTO.parse({ id: socket.id });
      const res = this.lobby.joinRoom(data.roomID, player);
      socket.join(data.roomID);

      ack?.({
        status: "ok",
        message: "successfully joined room",
        roomID: data.roomID,
      });
    } catch (error) {
      console.log(error);
      ack?.({ status: "error" });
    }
  }

  onLeaveRoom(socket, data, ack) {
    console.log(
      `[Socket (Server)] User ${socket.id} is trying to leave Room ${data.roomID}`,
    );
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
      `[Socket (Server)] User ${socket.id} is trying to start game in Room ${data.roomID}`,
    );
    this.lobby.startGameInRoom(data.roomID);
  }

  onGameActions(socket, data, ack) {
    console.log("[Socket (Server)] Received game actions from", socket.id);
    this.lobby.submitPlayerActions(data.roomID, socket.id, data.actions);
    ack?.({
      status: "ok",
    });
  }

  onGameFinish(socket, data, ack) {
    console.log(
      `[Socket (Server)] User ${socket.id} is trying to finish game in Room ${data.roomID}`,
    );
    this.lobby.finishGameInRoom(data.roomID);
  }

  init() {
    console.log("[Socket (Server)] Initializing Websocket");

    eventEmitter.on("server:room:start", (roomID, info) =>
      this.broadcastGameStart(roomID, info),
    );
    eventEmitter.on("server:room:actions", (roomID, actions) =>
      this.broadcastGameActions(roomID, actions),
    );

    this.server.on("connection", async (socket) => {
      console.log(`[Socket (Server)] User connected (${socket.id})`);

      socket.join("general");
      this.server.to(socket.id).emit("socket:id", socket.id);
      this.broadcastLobbyState();

      /**
       * Chat Events
       */
      socket.on("chat:message", (data) => this.onSendMessage(socket, data));

      /**
       * Room Events
       */
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

      /**
       * Game Events
       */
      socket.on("game:start", (data, ack) => {
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
        socket.rooms.forEach((roomID) => {
          if (roomID && roomID !== socket.id)
            this.onLeaveRoom(socket, { roomID });
        });
      });

      socket.on("disconnect", () => {
        console.log(`[Socket (Server)] User disconnected (${socket.id})`);
      });
    });
  }

  broadcastLobbyState() {
    console.log("[Socket (Server)] Broadcasting lobby state");
    const rooms = this.lobby.getAllRooms();
    this.server.emit("lobby:change", { rooms: rooms });
  }

  broadcastRoomState(roomID) {
    console.log(`[Socket (Server)] Broadcasting Room state to Room ${roomID}`);
    const room = this.lobby.getRoomByID(roomID);
    if (!room) return;
    const schema = RoomDTO.parse({
      id: roomID,
      hostID: room.hostID,
      players: room.players,
      status: room.status,
    });
    this.server.to(roomID).emit("room:change", schema);
  }

  broadcastGameStart(roomID, info) {
    console.log("[Socket (Server)] Broadcasting Game Start", roomID);
    this.server.to(roomID).emit("socket:game:start", info);
  }

  broadcastGameActions(roomID, actions) {
    console.log(
      "[Socket (Server)] Broadcasting Game Actions",
      roomID,
      actions.length,
    );
    this.server.to(roomID).emit("socket:game:update", actions);
  }
}

export default Socket;
