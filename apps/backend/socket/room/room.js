/* this is the room object used for creating specific games */

import { roomStatus } from "../../../../packages/shared/schemas/roomDTO.js";

class Room {
  constructor(roomDTO) {
    this.id = roomDTO.id;
    this.hostID = roomDTO.hostID;
    this.players = [];
    this.status = roomDTO.status;
  }

  addPlayer(PlayerDTO) {
    console.log(`Room ${this.id} is adding Player ${PlayerDTO.id}`);
    this.players.push(PlayerDTO);
  }
  removePlayer(PlayerDTO) {
    console.log(`Room ${this.id} is removing Player ${PlayerDTO.id}`);
    this.players = this.players.filter((val) => val.id !== PlayerDTO.id);
  }

  startGame() {
    this.status = roomStatus.INPROGRESS;
  }
  finishGame() {
    this.status = roomStatus.FINISHED;
  }
}

export default Room;

// ID, Players, Game Instance, Room Actions, Room Events
