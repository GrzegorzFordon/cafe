class Controller {
  constructor(game) {
    if (this.constructor == Controller)
      throw new Error("Abstract classes can't be instantiated.");
    this.game = game;
  }
  init() {}
}
export default Controller;
