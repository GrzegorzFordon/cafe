import Effect from "../effect.js";

class UnitDamagedEffect extends Effect {
  name = "Unit Damaged Effect";
  constructor(unitID, hex) {
    super();
    this.unitID = unitID;
  }
}
export default UnitDamagedEffect;
