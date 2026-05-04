import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";
import GameAdvancedEffect from "../../effect/effects/gameAdvanced.effect.js";

class StartState extends State {
  constructor() {
    super();
    this.name = "Start State";
    this.next = states.PLAN;
  }

  onEnter(controller) {
    const effect = new GameAdvancedEffect(GAME_PHASES.START);
    eventEmitter.emit("sim:advance", effect);
  }
}
export default StartState;
