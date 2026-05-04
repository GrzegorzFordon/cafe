import { eventEmitter } from "../../shared/eventEmitter.js";
import ActionController from "../action/action.controller.js";
import BoardController from "../board/board.controller.js";
import CardController from "../cards/card.controller.js";
import PlayerController from "../player/player.controller.js";
import UnitController from "../unit/unit.controller.js";
import GameModel from "./game.model.js";
import { nanoid } from "nanoid";
import StateMachine from "./states/stateMachine.js";
import { GAME_PHASES } from "../config.js";
import GameAdvancedEffect from "../effect/effects/gameAdvanced.effect.js";

class GameController {
  //options are: player decks, player heroes
  constructor(options) {
    this.options = options;
    this.model = new GameModel(options);
    this.stateMachine = new StateMachine();

    //controllers
    this.boardController = new BoardController();
    this.playerController = new PlayerController();
    this.unitController = new UnitController();
    this.cardController = new CardController();
    this.actionController = new ActionController();
  }

  start() {
    console.log(`[Game Controller] Started`);
    this.model = new GameModel(this.options);
    this.boardController.init(this.options);
    this.playerController.init(this.options); //TODO Handle both players
    this.unitController.init(this.options);
    this.stateMachine.init(this);
  }

  advance() {
    this.stateMachine.advance(this);
  }

  finish() {
    // TODO state machine set to game end with info
  }

  handleActions(actions) {
    // this.advance();
    while (actions.length > 0) {
      const nextAction = actions.shift();
      nextAction.execute(this);
    }
    this.advance();
  }
}

export default GameController;
