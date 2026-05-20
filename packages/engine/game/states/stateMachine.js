import EndState from "./end.state.js";
import PlanState from "./plan.state.js";
import ResolveState from "./resolve.state.js";
import StartState from "./start.state.js";
import UpkeepState from "./upkeep.state.js";

export const states = {
  START: StartState,
  PLAN: PlanState,
  UPKEEP: UpkeepState,
  RESOLVE: ResolveState,
  END: EndState,
};

class StateMachine {
  constructor() {
    this.state = undefined;
    this.lastPhaseSpeed = 7;
  }

  init(controller) {
    this.state = new states.START();
    this.state.onEnter(controller);
  }

  advance(controller) {
    if (this.state) this.state.onExit(controller);
    this.state = new this.state.next({ lastPhaseSpeed: this.lastPhaseSpeed });
    // console.log("[StateMachine] Entering:", this.state.name);

    this.state.onEnter(controller);
  }

  changeState(newState) {
    if (this.state) this.state.onExit(controller);
    this.state = newState;
    this.state.onEnter(controller);
  }
}
StateMachine.startState = new StartState();
StateMachine.planState = new PlanState();
export default StateMachine;

/**
 * game-start (room called start)
 ** game-upkeep (draw up to hand size, onUpkeep() on units)
 ** game-plan (this is where players get to send in actions for the turn)
 ** game-resolve (sort actions, resolve, save new state, send back actions (and state?))
 * game-end (wincondition achieved)
 */
