import Effect from "../effect.js";

class PlayerActionsCountEffect extends Effect {
  name = "Player Actions Count Effect";
  constructor(playerID, newValue) {
    super();
    this.playerID = playerID;
    this.newValue = newValue;
  }
}
export default PlayerActionsCountEffect;
