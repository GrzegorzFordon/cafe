import GameManager from "../../../../packages/engine/game/game.controller.js";

class Games {
  constructor() {
    this.games = new Map();
  }

  createGame(roomID) {
    const game = new GameManager();
    this.games.set(roomID, game);
  }
}

export default Games;
