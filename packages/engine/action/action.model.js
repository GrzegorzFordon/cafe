import { nanoid } from "nanoid";

class Action {
  constructor() {
    this.id = nanoid();
  }

  execute(model) {
    //executes the action (does stuff to the engine (game instance))
  }
}

export default Action;
