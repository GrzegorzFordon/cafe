import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import State from "./state.js";
import StateMachine, { states } from "./stateMachine.js";
import { GAME_PHASES } from "../../config.js";

class StartState extends State {
  constructor() {
    super();
    this.name = "StartState";
    this.next = states.PLAN;
  }

  onEnter(controller) {
    console.log("State Machine is entering Start State");
    // this.stateMachine.init(this);
    controller.boardController.init(controller.options);
    controller.playerController.init(controller.options); //TODO Handle both players
    controller.unitController.init(controller.options);
    eventEmitter.emit("sim:start", GAME_PHASES.START);
  }
}
export default StartState;
