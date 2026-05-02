import ActionController from "../action/action.controller.js";
import BoardController from "../board/board.controller.js";
import CardController from "../cards/card.controller.js";
import PlayerController from "../player/player.controller.js";
import UnitController from "../unit/unit.controller.js";
import GameModel from "./game.model.js";
import { nanoid } from "nanoid";

class GameController {
  //options are: player decks, player heroes
  constructor(options) {
    // this.id = nanoid(); // ??
    this.options = options;
    //game model
    this.model = new GameModel(options);

    //other controllers
    this.boardController = new BoardController();
    this.playerController = new PlayerController();
    this.unitController = new UnitController();
    this.cardController = new CardController();
    this.actionController = new ActionController();
  }

  start() {
    console.log(`Game Started`, this.model.id);
    this.model = new GameModel(this.options);
    this.boardController.init(this.options);
    this.playerController.init(this.options); //TODO Handle both players
    this.unitController.init(this.options);
    // this.cardController.init(this.options);
    // this.actionController.init(this.options);
    //TODO state machine init
  }

  advance() {
    // TODO state machine advance
    /**
     * game-start (room called start)
     ** game-upkeep (draw up to hand size, onUpkeep() on units)
     ** game-plan (this is where players get to send in actions for the turn)
     ** game-resolve (sort actions, resolve, save new state, send back actions (and state?))
     * game-end (wincondition achieved)
     */
  }

  finish() {
    // TODO state machine set to game end with info
  }
}

export default GameController;

// serialize() {
//   //TODO turn all needed info into a game(state?)DTO (schemas)
//   //actually not needed cause we only send back actions?
// }
