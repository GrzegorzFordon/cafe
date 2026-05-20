import Effect from "../effect.js";

class UnitSpawnedEffect extends Effect {
  name = "Unit Spawned Effect";
  constructor(unit,hex) {
    super();
    this.unit = unit;
    this.hex = hex;
  }
}
export default UnitSpawnedEffect;
