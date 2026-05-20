import { eventEmitter } from "../../shared/eventEmitter.js";
import ActionController from "../action/action.controller.js";
import BoardController from "../board/board.controller.js";
import CardController from "../cards/card.controller.js";
import PlayerController from "../player/player.controller.js";
import UnitController from "../unit/unit.controller.js";
import GameModel from "./game.model.js";
import { nanoid } from "nanoid";
import StateMachine, { states } from "./states/stateMachine.js";
import { BASE_HEX_MAP, GAME_PHASES, TARGET_HEX_MAP } from "../config.js";
import GameAdvancedEffect from "../effect/effects/gameAdvanced.effect.js";
import _ from "lodash";
import EventEmitter from "eventemitter3";
import ChargedModifier from "../unit/modifier/charged.modifier.js";
import UnitChargedEffect from "../effect/effects/unitCharged.effect.js";
import UnitModifiedEffect from "../effect/effects/unitModified.effect.js";

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

  async start() {
    // console.log("[Game] Initialized, options:", this.options);
    console.log(this.options);
    this.model = new GameModel(this);
    await this.stateMachine.init(this);
    await this.boardController.init(this);
    await this.playerController.init(this);
    await this.unitController.init(this);
    this.advance();
  }

  advance() {
    this.stateMachine.advance(this);
  }

  finish() {
    // TODO state machine set to game end with info
    this.stateMachine.changeState(states.END);
  }

  sortActionsBySpeed(actions) {
    return actions.sort(
      (a, b) =>
        (b?.card?.speed ? b.card.speed : b.unit.speed) -
        (a?.card?.speed ? a.card.speed : a.unit.speed),
    );
  }

  handleActions(actions) {
    this.advance();
    console.log(JSON.stringify(actions));
    // actions.forEach((val) => console.log(val.card.speed));
    actions = this.sortActionsBySpeed(actions);
    // actions.forEach((val) => console.log(val.card.speed));

    _.defer(() => {
      while (actions.length > 0) {
        const nextAction = actions.shift();
        if (nextAction.name === "PLAY") this.handlePlayAction(nextAction);
        if (nextAction.name === "MOVE") this.handleMoveAction(nextAction);
      }
      this.advance();
    });

    // _.defer(() => {
    // });
  }

  handleAction(action) {
    // console.log("[Game] handling", action.id);
    action.bonuses.forEach((val) => {
      this.playerController.discardCard(action.playerID, val.id);
    });
  }

  handleMoveAction(action) {
    this.handleAction(action);
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

  handleChargedUnitInBase() {
    this.unitController.units.forEach((unit) => {
      const unitStandsOnBase =
        BASE_HEX_MAP.get(0).isEqual(unit.hex) ||
        BASE_HEX_MAP.get(1).isEqual(unit.hex);

      const unitCharged = unit.modifiers.some((mod) => mod.name === "Charged");
      // console.log(unit.id, unitStandsOnBase, unitCharged);
      if (unitStandsOnBase && unitCharged) {
        console.log(unit.id, "is charged and standing on base");
        // const modifier = new ChargedModifier();
        // unit.addModifier(modifier);
        // const effect = new UnitModifiedEffect(unit.id, modifier, true);
        // this.eventEmitter.emit("sim:effect", effect);
        unit.die(this);
      }
    });
  }
  handleCharge() {
    this.unitController.units.forEach((unit) => {
      const unitStandsOnCharger =
        TARGET_HEX_MAP.get(0).isEqual(unit.hex) ||
        TARGET_HEX_MAP.get(1).isEqual(unit.hex);

      const unitAlreadyCharged = unit.modifiers.some(
        (mod) => mod.name === "Charged",
      );
      if (unitStandsOnCharger && !unitAlreadyCharged) {
        console.log(unit.id, "standing on charger");
        const modifier = new ChargedModifier();
        unit.addModifier(modifier);
        const effect = new UnitModifiedEffect(unit.id, modifier, true);
        this.eventEmitter.emit("sim:effect", effect);
      }
    });
  }
}

export default GameController;
