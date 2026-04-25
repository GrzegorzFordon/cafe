/**
 * MAIN GAME MANAGER
 */

class GameManager {
  constructor(options) {
    this.id = options.id;
  }

  init() {
    //init all child systems
    //tell phase manager to start the game
    console.log(`Game is initialized`);
  }
}

export default GameManager;
