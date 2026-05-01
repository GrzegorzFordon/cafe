import FakeGameModel from "./game.model.fake";

class FakeGameController {
  constructor() {
    this.model = new FakeGameModel();
  }

  //business logic is in the actions themselves!
  handleAction(action) {
    action.impl(this.model);
  }
}

export default FakeGameController;
