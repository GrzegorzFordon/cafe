import _ from "lodash";

class FakeGameModel {
  constructor() {
    this.count = 0;
  }

  add() {
    this.count += 1;
    return _.clone(this);
  }
}

export default FakeGameModel;
