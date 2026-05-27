import Ability from "./ability.js";

class DamageUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.playerID = options.playerID;
    this.unit = options.unit;
    this.amount = options.amount;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.damageUnit(this.unit.id, this.amount);
  }
}
export default DamageUnitAbility;
