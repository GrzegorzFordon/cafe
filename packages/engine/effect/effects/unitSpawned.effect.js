import Effect from "../effect.js";

class UnitSpawnedEffect extends Effect {
  name = "Unit Spawned Effect";
  constructor(unit) {
    super();
    this.unit = unit;
  }
}
export default UnitSpawnedEffect;
