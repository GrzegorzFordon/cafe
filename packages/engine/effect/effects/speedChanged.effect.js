import Effect from "../effect.js";

class SpeedChangedEffect extends Effect {
  name = "Speed Changed Effect";
  constructor(speed) {
    super();
    this.speed = speed;
  }
}
export default SpeedChangedEffect;
