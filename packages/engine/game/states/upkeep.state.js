import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";
import GameAdvancedEffect from "../../effect/effects/gameAdvanced.effect.js";

class UpkeepState extends State {
  constructor() {
    super();
    this.name = "UpkeepState";
    this.next = states.PLAN;
  }

  onEnter(controller) {
    const effect = new GameAdvancedEffect(GAME_PHASES.UPKEEP);
    eventEmitter.emit("sim:advance", effect);
    // controller.playerController.draw(2)
  }
}
export default UpkeepState;
