/**
 * MAIN GAME MANAGER
 * game entity, state and actions
 * So this is game state AND manager? Then this is not what we send to the player. We send a gameDTO, which is a player parsed game state
 * instead of passing a game state to the parser, this holds the game state and is the parser

 * state machine for phases (+start/end states)?
 */

import Board from "../board/board.controller.js";
import { GAME_PHASES } from "../config.js";
import GameModel from "./game.model.js";
import { nanoid } from "zod";

class GameController {
  constructor(options) {
    this.id = nanoid(); // ??
    // this.state = gameState;
    this.board = new Board();
    this.players = new Map();
    this.activePhase = GAME_PHASES.START;
  }

  init() {
    //init all child systems
    //tell phase manager to start the game
    console.log(`GameController is initialized`);
  }

  startGame() {
    let gameState = new GameModel();
  }

  finishGame() {}

  serialize() {
    //TODO turn all needed info into a game(state?)DTO (schemas) actually not needed cause we only send back actions?
  }
}

export default GameController;

/**
 * states the game can be in
 * game-start (room called start)
 ** game-upkeep (draw up to hand size, onUpkeep() on units)
 ** game-plan (this is where players get to send in actions for the turn)
 ** game-resolve (sort actions, resolve, save new state, send back actions (and state?))
 * game-end (wincondition achieved)
 */
