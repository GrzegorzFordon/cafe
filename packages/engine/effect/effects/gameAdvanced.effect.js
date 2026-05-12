import Effect from "../effect.js";

class GameAdvancedEffect extends Effect {
  name = "Game Advanced Effect";
  constructor(phase, options) {
    super();
    this.phase = phase;
    this.options = options;
  }
}
export default GameAdvancedEffect;
