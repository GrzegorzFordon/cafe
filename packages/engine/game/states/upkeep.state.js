import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";
import GameAdvancedEffect from "../../effect/effects/gameAdvanced.effect.js";

class UpkeepState extends State {
  constructor() {
    super();
    this.name = "Upkeep State";
    this.next = states.PLAN;
  }

  onEnter(controller) {
    const effect = new GameAdvancedEffect(GAME_PHASES.UPKEEP);
    eventEmitter.emit("sim:advance", effect);
    controller.playerController.drawUpToHandSize();
    controller.advance();
  }

  checkWincon(controller) {
    //If either base has a unit that it does not share an owner with
    //increase it (on game model likely)
    //If that gets it to two, win the game (call finishGame with the id)
  }
}
export default UpkeepState;

/**
 * Have players draw up to hand size OR burn the top card if their hand is full (to force deckout)
 */
