import { eventEmitter } from "../../shared/eventEmitter.js";
import ActionController from "../action/action.controller.js";
import BoardController from "../board/board.controller.js";
import CardController from "../cards/card.controller.js";
import PlayerController from "../player/player.controller.js";
import UnitController from "../unit/unit.controller.js";
import GameModel from "./game.model.js";
import { nanoid } from "nanoid";
import StateMachine, { states } from "./states/stateMachine.js";
import { GAME_PHASES } from "../config.js";
import GameAdvancedEffect from "../effect/effects/gameAdvanced.effect.js";
import _ from "lodash";

class GameController {
  //options are: player decks, player heroes
  constructor(options) {
    this.options = options;
    this.model = new GameModel(options);
    this.stateMachine = new StateMachine();

    //controllers
    this.boardController = new BoardController(this);
    this.playerController = new PlayerController(this);
    this.unitController = new UnitController(this);
    this.cardController = new CardController(this);
    this.actionController = new ActionController(this);
  }

  start() {
    // console.log(`[Game Controller] Started`);
    this.model = new GameModel(this.options);
    this.stateMachine.init(this);
    this.boardController.init(this.options);
    this.playerController.init(this.options); //TODO Handle both players
    this.unitController.init(this.options);
    this.advance();
  }

  advance() {
    this.stateMachine.advance(this);
  }

  finish() {
    // TODO state machine set to game end with info
    this.stateMachine.changeState(states.END);
  }

  handleActions(actions) {
    this.advance();

    _.defer(() => {
      while (actions.length > 0) {
        const nextAction = actions.shift();
        nextAction.execute(this);
      }
    });

    _.defer(() => {
      this.advance();
    });
  }

  handleWincon() {
    /**
     * for each player
     * get base hex
     * get unit on hex from board controller
     * if unit AND unit.playerID same as playerID
     * advance wincon in model
     * then if wincon in model is wincon
     * finish()
     */
    this.playerController.players.forEach((element) => {
      // console.log("Checking wincon for Player", element.playerID);
    });
  }
}

export default GameController;
