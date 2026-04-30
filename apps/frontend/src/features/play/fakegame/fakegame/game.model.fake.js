import _ from "lodash";

class FakeGameModel {
  constructor() {
    this.count = 0;
  }

  add(amount) {
    this.count += amount;
    //replace with immer??
    return _.clone(this);
  }
}

export default FakeGameModel;
