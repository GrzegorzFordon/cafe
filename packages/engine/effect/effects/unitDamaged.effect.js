import Effect from "../effect.js";

class UnitDamagedEffect extends Effect {
  name = "Unit Damaged Effect";
  constructor(unitID, amount) {
    super();
    this.unitID = unitID;
    this.amount = amount;
  }
}
export default UnitDamagedEffect;
