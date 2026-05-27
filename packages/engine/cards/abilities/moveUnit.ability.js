import Ability from "./ability.js";

class MoveUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.playerID = options.playerID;
    this.unit = options.unit;
    this.hex = options.hex;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.moveUnit(this.unit.id, this.hex, false);
  }
}
export default MoveUnitAbility;
