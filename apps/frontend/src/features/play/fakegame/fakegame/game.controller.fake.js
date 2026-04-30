import FakeGameModel from "./game.model.fake";

class FakeGameController {
  constructor() {
    this.model = new FakeGameModel();
  }

  addToModel(amount) {
    this.model.add(amount);
  }
}

export default FakeGameController;
