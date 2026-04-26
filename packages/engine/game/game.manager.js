/**
 * MAIN GAME MANAGER
 * game entity, state and actions
 * So this is game state AND manager? Then this is not what we send to the player. We send a gameDTO, which is a player parsed game state
 * instead of passing a game state to the parser, this holds the game state and is the parser

state machine for phases (+start/end states)

The ActionResolver is a pure state machine: (state, input) → (newPhase, sideEffects[]). 
The GameEngine applies side effects (mutate coins, reveal cards, set timers) and broadcasts per-player views through StateSerializer.
FSM needed?
 */

import BoardManager from "../board/board.manager.js";

class GameManager {
  constructor(options) {
    this.id = options.id;
    this.boardManager = new BoardManager();
  }

  init() {
    //init all child systems
    //tell phase manager to start the game
    console.log(`GameManager is initialized`);
  }

  draw(player, amount) {}

  //??
  validateDeck(deck) {}
}

export default GameManager;

/**
 * states the game can be in
 * game-start (room called start)
 ** game-upkeep (draw up to hand size, onUpkeep() on units)
 ** game-plan (this is where players get to send in actions for the turn)
 ** game-resolve (sort actions, resolve, save new state, send back actions (and state?))
 * game-end (wincondition achieved)
 */