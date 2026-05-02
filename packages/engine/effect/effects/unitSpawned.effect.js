import Effect from "../effect";

class UnitSpawnedEffect extends Effect {
  name = "Unit Spawned Effect";
  constructor(unit) {
    super();
    this.unit = unit;
  }
}
export default UnitSpawnedEffect;
