import FakeGameModel from "./game.model.fake";

class FakeGameController {
  constructor() {}

  addToModel(model) {
    const res = model.add();
    return res;
  }
}

export default FakeGameController;
