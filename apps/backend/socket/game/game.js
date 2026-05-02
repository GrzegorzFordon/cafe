import GameManager from "@cafe/engine/game/game.manager";
import Socket from "../socket";

class Game {
  constructor() {
    //this is a server game object
    this.manager = new GameManager();
    // this.state = new GameState();
  }

  startGame(){
    Socket.broadcastGameState();
  }
}

/**
 * THIS is where most of the game logic is going to get routed to
 * then sent to manager
 */
