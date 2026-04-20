import { customAlphabet } from "nanoid";
import Room from "./room.js";

const rooms = new Map();
const engines = new Map();

const getRandomRoomCode = () => {
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
  let ID;
  do {
    ID = nanoid();
  } while (rooms.has(ID));
  return ID;
};

const createRoom = () => {
  const roomID = getRandomRoomCode();
  console.log(`Room Manager creating new Room with ID ${roomID}`);
  const room = new Room();
  rooms.set(roomID, room);
};

const joinRoom = () => {};
const leaveRoom = () => {};

export default getRandomRoomCode;
