import FakeGameModel from "./game.model.fake";

class FakeGameController {
  constructor() {}

  addToModel(model,amount) {
    const res = model.add(amount);
    return res;
  }
}

export default FakeGameController;
