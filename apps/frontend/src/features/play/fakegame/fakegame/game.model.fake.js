import { eventEmitter } from "../../../../util/eventEmitter";

class FakeGameModel {
  constructor() {
    this.count = 0;
  }

  add(amount) {
    this.count += amount;
    eventEmitter.emit("fake:addition", this.count);
  }
}

export default FakeGameModel;
