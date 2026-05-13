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
    this.submittedActions = new Map();
  }

  // effects = [];

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
      // console.log("[Room]", this.id, val.name);
      // this.effects.push(val);
    });
    this.gameController.eventEmitter.on("sim:advance", (val) => {
      // console.log(this.id, val, this.effects);
      // eventEmitter.emit("room:advance", this.id, val.phase, this.effects);
      // this.effects = [];
    });

    this.gameController.start();
    this.status = roomStatus.INPROGRESS;
    eventEmitter.emit("server:room:start", this.id, this.players);
  }

  submitActions(playerID, actions) {
    console.log("[Room] submit actions", playerID, actions.length);
    this.submittedActions.set(playerID, actions);

    let allSubmitted = true;

    this.players.forEach((player) => {
      if (!this.submittedActions.has(player.id)) allSubmitted = false;
    });

    if (allSubmitted) {
      let combinedActions = [];
      this.submittedActions.forEach((actions) =>
        actions.forEach((action) => combinedActions.push(action)),
      );

      this.updateGame(combinedActions);
    }
  }

  updateGame(actions) {
    this.gameController.handleActions([...actions]);
    eventEmitter.emit("server:room:actions", this.id, actions);
    this.submittedActions = new Map();
  }

  // finishGame() {
  //   this.status = roomStatus.FINISHED;
  // }
}

export default Room;

// ID, Players, Game Instance, Room Actions, Room Events
