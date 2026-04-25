/**
 * MAIN GAME MANAGER
 * game entity, state and actions

state machine for phases (+start/end states)

The ActionResolver is a pure state machine: (state, input) → (newPhase, sideEffects[]). 
The GameEngine applies side effects (mutate coins, reveal cards, set timers) and broadcasts per-player views through StateSerializer.

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
}

export default GameManager;
