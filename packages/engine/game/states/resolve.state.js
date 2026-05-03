import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";

class ResolveState extends State {
  constructor() {
    super();
    this.name = "ResolveState";
    this.next = states.UPKEEP;
  }

  onEnter(controller) {
    console.log("State Machine is entering RESOLVE State");
    // eventEmitter.emit("sim:advance", GAME_PHASES.RESOLVE);
  }
}
export default ResolveState;
