import Ability from "../ability.js";

class MoveUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.unit = options.unit;
    this.hex = options.hex;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.moveUnit(this.unit.id, this.hex, true);
  }
}
export default MoveUnitAbility;
