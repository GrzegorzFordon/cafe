import Ability from "../ability.js";
import OneshotAbility from "./oneshot.oneshot.js";

class DamageUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.unit = options.unit;
    this.amount = options.amount;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.damageUnit(this.unit.id, this.amount);
  }
}
export default DamageUnitAbility;
