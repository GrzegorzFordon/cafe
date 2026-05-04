import Effect from "../effect.js";

class UnitMovedEffect extends Effect {
  name = "Unit Moved Effect";
  constructor(unit, hex) {
    super();
    this.unit = unit;
    this.hex = hex;
  }
}
export default UnitMovedEffect;
