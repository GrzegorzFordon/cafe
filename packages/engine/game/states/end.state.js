import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";

class EndState extends State {
  constructor() {
    super();
    this.name = "End State";
    this.next = undefined;
  }

  onEnter(controller) {
    // eventEmitter.emit("sim:advance", GAME_PHASES.END);
  }
}
export default EndState;
