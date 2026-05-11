/* this is the room object used for creating specific games */

import GameController from "@cafe/engine/game/game.controller.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import EventEmitter from "eventemitter3";

export const roomStatus = {
  LOBBY: 0,
  INPROGRESS: 1,
  FINISHED: 2,
};

class Room {
  constructor(roomDTO) {
    this.id = roomDTO.id;
    this.hostID = roomDTO.hostID;
    this.players = [];
    this.status = roomDTO.status;
    this.gameController = new GameController({ players: this.players });
    // this.eventEmitter = new EventEmitter();
  }

  effects = [];

  addPlayer(PlayerDTO) {
    console.log(`[Room] ${this.id} Adding Player ${PlayerDTO.id}`);
    this.players.push(PlayerDTO);
  }
  removePlayer(PlayerDTO) {
    console.log(`[Room] ${this.id} Removing Player ${PlayerDTO.id}`);
    this.players = this.players.filter((val) => val.id !== PlayerDTO.id);
  }

  startGame() {
    console.log("[Room] Starting Game Sim", this.id, this.players);

    this.gameController.eventEmitter.on("sim:effect", (val) => {
      console.log("[Room]", this.id, val.name);
      this.effects.push(val);
    });
    this.gameController.eventEmitter.on("sim:advance", (val) => {
      // console.log(this.id, val, this.effects);
      eventEmitter.emit("room:advance", this.id, val.phase, this.effects);
      this.effects = [];
    });

    this.gameController.start();
    this.status = roomStatus.INPROGRESS;
  }

  updateGame(actions) {
    // console.log("ROOM", actions);
    this.gameController.handleActions(actions);
  }

  finishGame() {
    this.status = roomStatus.FINISHED;
  }
}

export default Room;

// ID, Players, Game Instance, Room Actions, Room Events
