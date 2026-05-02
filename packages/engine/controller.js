class Controller {
  constructor() {
    if (this.constructor == Controller)
      throw new Error("Abstract classes can't be instantiated.");
  }
  init() {}
}
export default Controller;
