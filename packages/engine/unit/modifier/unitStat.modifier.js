import { UNIT_STATS } from "../../config.js";
import ModifierModel from "./modifier.model.js";

class UnitStatModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Unit Stat";
    this.stat = options.stat ?? UNIT_STATS.ATTACK;
    this.amount = options.amount ?? 0;
  }
}

export default UnitStatModifier;
