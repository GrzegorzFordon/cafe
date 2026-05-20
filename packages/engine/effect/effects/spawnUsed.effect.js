import Effect from "../effect.js";

class SpawnUsedEffect extends Effect {
  name = "Spawn Used Effect";
  constructor(hex,unit) {
    super();
    this.hex = hex;
    this.unit = unit;
  }
}
export default SpawnUsedEffect;
