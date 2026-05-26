import Ability from "./ability.js";
import UnitModifiedEffect from "../../effect/effects/unitModified.effect.js";
class ModifyUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.playerID = options.playerID;
    this.unit = options.unit;
    this.modification = options.modification;
  }

  resolve(controller) {
    super.resolve(controller);
    // console.log(this);
    // this.unit.modifiers.push(this.modification);
    // const effect = new UnitModifiedEffect(
    //   this.unit.id,
    //   this.modification,
    //   true,
    // );
    // controller.eventEmitter.emit("sim:effect", effect);
    controller.unitController.modifyUnit(this.unit.id, this.modification);
  }
}
export default ModifyUnitAbility;
