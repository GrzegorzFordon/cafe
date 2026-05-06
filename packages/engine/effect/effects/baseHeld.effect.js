import Effect from "../effect.js";

class BaseHeldEffect extends Effect {
  name = "Base Held Effect";
  constructor(playerID) {
    super();
    this.playerID = playerID;
  }
}
export default BaseHeldEffect;
