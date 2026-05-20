import Effect from "../effect.js";

class SpawnFreedEffect extends Effect {
  name = "Spawn Freed Effect";
  constructor(hex, unit) {
    super();
    this.hex = hex;
    // this.unit = unit;
  }
}
export default SpawnFreedEffect;
