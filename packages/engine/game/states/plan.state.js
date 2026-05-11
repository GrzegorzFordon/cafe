import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";
import GameAdvancedEffect from "../../effect/effects/gameAdvanced.effect.js";

class PlanState extends State {
  constructor() {
    super();
    this.name = "Plan State";
    this.next = states.RESOLVE;
  }

  onEnter(controller) {
    const effect = new GameAdvancedEffect(GAME_PHASES.PLAN);
    controller.eventEmitter.emit("sim:advance", effect);
    //TODO start timer
  }
}
export default PlanState;
