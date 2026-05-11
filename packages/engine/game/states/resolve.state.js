import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";
import GameAdvancedEffect from "../../effect/effects/gameAdvanced.effect.js";

class ResolveState extends State {
  constructor() {
    super();
    this.name = "Resolve State";
    this.next = states.UPKEEP;
  }

  onEnter(controller) {
    const effect = new GameAdvancedEffect(GAME_PHASES.RESOLVE);
    controller.eventEmitter.emit("sim:advance", effect);
    // controller.handleActions
  }
}
export default ResolveState;
