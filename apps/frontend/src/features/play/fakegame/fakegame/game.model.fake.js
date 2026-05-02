import { eventEmitter } from "@cafe/shared/eventEmitter";
import FakeEffect from "../effect.fake";

class FakeGameModel {
  constructor() {
    this.count = 0;
  }

  //for validation and valid choices?
  get foo() {
    return "bar";
  }

  add(amount) {
    this.count += amount;
    eventEmitter.emit("sim:effect", new FakeEffect(this.count));
    // return new FakeEffect(this.count);
  }
}

export default FakeGameModel;
