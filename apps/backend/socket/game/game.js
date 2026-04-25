import GameManager from "../../../../packages/engine/game/game.manager";

class Game {
  constructor() {
    //this is a server game object
    this.manager = new GameManager();
  }
}

/**
 * THIS is where most of the game logic is going to get routed to
 * then sent to manager
 */
