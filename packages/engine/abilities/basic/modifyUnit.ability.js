import Ability from "../ability.js";

class ModifyUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.unit = options.unit;
    this.modification = options.modification;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.modifyUnit(this.unit.id, this.modification);
  }
}
export default ModifyUnitAbility;
