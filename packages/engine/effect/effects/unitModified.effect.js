import Effect from "../effect.js";

class UnitModifiedEffect extends Effect {
  name = "Unit Modified Effect";
  constructor(unitID, modifier, added) {
    super();
    this.unitID = unitID;
    this.modifier = modifier;
    this.added = added;
  }
}
export default UnitModifiedEffect;
