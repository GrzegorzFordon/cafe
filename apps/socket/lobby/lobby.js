import { customAlphabet } from "nanoid";
import Room, { roomStatus } from "./room.js";
import { PlayerDTO, RoomDTO } from "../../../packages/shared/schemas/schemas";

class Lobby {
  constructor() {
    this.rooms = new Map();
  }

  getRandomRoomCode() {
    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
    let ID;
    do {
      ID = nanoid();
    } while (this.rooms.has(ID));
    return ID;
  }

  createRoom(playerDTO) {
    try {
      const roomID = this.getRandomRoomCode();
      const res = RoomDTO.parse({
        id: roomID,
        hostID: playerDTO.id,
        players: [],
        status: roomStatus.LOBBY,
      });
      const room = new Room(res);
      this.rooms.set(roomID, room);
      this.joinRoom(roomID, playerDTO);
      return { roomID };
    } catch (error) {
      throw error;
    }
  }

  joinRoom(roomID, playerDTO) {
    try {
      const room = this.getRoomByID(roomID);
      room.addPlayer(playerDTO);
    } catch (error) {
      throw error;
    }
  }

  leaveRoom(roomID, playerDTO) {
    try {
      const room = this.getRoomByID(roomID);
      room.removePlayer(playerDTO);
      if (room.players.length == 0) this.deleteRoom(roomID);
    } catch (error) {
      throw error;
    }
  }

  deleteRoom(roomID) {
    try {
      const room = this.getRoomByID(roomID);
      this.rooms.delete(room.id);
    } catch (error) {}
  }

  getRoomByID(roomID) {
    return this.rooms.get(roomID);
  }

  getAllRooms() {
    const list = [];
    this.rooms.forEach((val, key, map) => list.push({ id: key }));
    return list;
  }

  getAllPlayersInRoom(roomID) {
    const room = this.getRoomByID(roomID);
    return room.players;
  }

  startGameInRoom(roomID) {
    try {
      const room = this.getRoomByID(roomID);
      room.startGame();
    } catch (error) {
      throw error;
    }
  }

  submitPlayerActions(roomID, playerID, actions) {
    try {
      const room = this.getRoomByID(roomID);
      room.submitActions(playerID, actions);
    } catch (error) {
      throw error;
    }
  }

  updateGameInRoom(roomID, actions) {
    try {
      const room = this.getRoomByID(roomID);
      room.updateGame(actions);
    } catch (error) {
      throw error;
    }
  }

  finishGameInRoom(roomID) {
    try {
      const room = this.getRoomByID(roomID);
      room.finishGame();
    } catch (error) {
      throw error;
    }
  }
}

export default Lobby;
