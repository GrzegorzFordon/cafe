import { nanoid } from "nanoid";

class Action {
  constructor() {
    this.id = nanoid();
    this.playerID = undefined;
  }

  execute(model) {
    //executes the action (does stuff to the engine (game instance))
  }
}

export default Action;
