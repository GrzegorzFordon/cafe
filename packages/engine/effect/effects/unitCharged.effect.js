import Effect from "../effect.js";

class UnitChargedEffect extends Effect {
  name = "Unit Charged Effect";
  constructor(unitID, isCharged) {
    super();
    this.unitID = unitID;
    this.isCharged = isCharged;
  }
}
export default UnitChargedEffect;
