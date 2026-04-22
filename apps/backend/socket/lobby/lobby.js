import { customAlphabet } from "nanoid";
import Room from "../room/room.js";

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

  createRoom() {
    try {
      const roomID = this.getRandomRoomCode();
      console.log(`Room Manager creating new Room with ID ${roomID}`);
      const room = new Room("hostID", roomID);
      this.rooms.set(roomID, room);
      // this.rooms.forEach((val, key, map) => console.log(key));
      return { roomID };
    } catch (error) {
      throw error;
    }
  }

  joinRoom() {}
  leaveRoom() {}

  getRoomByID(roomID) {
    return this.rooms.get(roomID);
  }

  getAllRooms() {
    const list = [];
    this.rooms.forEach((val, key, map) => list.push({ id: key }));
    return list;
  }
}

export default Lobby;
