import Effect from "../effect.js";

class UnitDiedEffect extends Effect {
  name = "Unit Died Effect";
  constructor(unitID) {
    super();
    this.unitID = unitID;
  }
}
export default UnitDiedEffect;
