import Effect from "../effect.js";

class UnitMovedEffect extends Effect {
  name = "Unit Moved Effect";
  constructor(unitID, hex) {
    super();
    this.unitID = unitID;
    this.hex = hex;
  }
}
export default UnitMovedEffect;
