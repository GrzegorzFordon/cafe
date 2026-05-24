import Ability from "./ability.js";

class ModifyUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.playerID = options.playerID;
    this.unit = options.unit;
    this.modification = options.modification;
  }

  resolve(controller) {
    super.resolve(controller);
  }
}
export default ModifyUnitAbility;
