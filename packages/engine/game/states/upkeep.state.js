import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";

class UpkeepState extends State {
  constructor() {
    super();
    this.name = "UpkeepState";
    this.next = states.PLAN;
  }

  onEnter(controller) {
    console.log("State Machine is entering UPKEEP State");
    // eventEmitter.emit("sim:advance", GAME_PHASES.UPKEEP);
  }
}
export default UpkeepState;
