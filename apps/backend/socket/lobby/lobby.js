import { customAlphabet } from "nanoid";
import Room from "./room.js";
import PlayerDTO from "../../../../packages/shared/schemas/playerDTO.js";
import RoomDTO, {
  roomStatus,
} from "../../../../packages/shared/schemas/roomDTO.js";

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
      console.log(`Room Manager creating new Room with ID ${roomID}`);
      const res = RoomDTO.parse({
        id: roomID,
        hostID: "hostID",
        players: [],
        status: roomStatus.LOBBY,
      });
      const room = new Room(res);
      this.rooms.set(roomID, room);
      this.joinRoom(roomID, playerDTO);
      // this.rooms.forEach((val, key, map) => console.log(key));
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
      console.log(`Deleting Room ${roomID}`);
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
