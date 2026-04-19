import { customAlphabet } from "nanoid";

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

const createRoom = () => {};
const joinRoom = () => {};
const leaveRoom = () => {};

export default getRandomRoomCode;
