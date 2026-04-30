import FakeGameModel from "./game.model.fake";

class FakeGameController {
  constructor() {
    this.model = new FakeGameModel();
  }

  addToModel() {
    const res = this.model.add();
    this.model = res;
    return res;
  }

  getCount() {
    return this.model.count;
  }
}

export default FakeGameController;
