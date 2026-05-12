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
import EventEmitter from "eventemitter3";

class GameController {
  //options are: player decks, player heroes
  constructor(options) {
    this.options = options;
    this.model = new GameModel(options);
    this.stateMachine = new StateMachine();
    this.eventEmitter = new EventEmitter();

    //controllers
    this.boardController = new BoardController(this);
    this.playerController = new PlayerController(this);
    this.unitController = new UnitController(this);
    this.cardController = new CardController(this);
    this.actionController = new ActionController(this);
  }

  start() {
    // console.log("[Game] Initialized, options:", this.options);

    this.model = new GameModel(this);
    this.stateMachine.init(this);
    this.boardController.init(this);
    this.playerController.init(this); //TODO Handle both players
    this.unitController.init(this);
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
        // console.log("[Game] Next:", nextAction.name, nextAction.card?.name);
        if (nextAction.name === "PLAY") this.handlePlayAction(nextAction);
        if (nextAction.name === "MOVE") this.handleMoveAction(nextAction);
      }
    });

    _.defer(() => {
      this.advance();
    });
  }

  handleAction(action) {
    // console.log("[Game] handling", action.id);
    action.bonuses.forEach((val) => {
      this.playerController.discardCard(action.playerID, val.id);
      // console.log(val);
    });
  }

  handleMoveAction(action) {
    this.handleAction(action);
    // console.log("[Game] handling", action);

    this.boardController.resolveMove(action.unit, action.hex, action.bonuses);
  }

  handlePlayAction(action) {
    this.handleAction(action);
    const options = { hex: action.hex };
    this.cardController.resolveCard(action.playerID, action.card.id, options);
    this.playerController.discardCard(action.playerID, action.card.id);
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
    this.playerController.playerModels.forEach((element) => {
      // console.log("Checking wincon for Player", element.playerID);
    });
  }
}

export default GameController;
