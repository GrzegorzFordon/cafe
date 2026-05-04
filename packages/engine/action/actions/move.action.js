import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, hex) {
    super();
    this.unit = unit;
    this.hex = hex;
  }

  name = "Move";

  execute(controller) {
    //get unit, move it
    controller.unitController.moveUnit(this.unit.id, this.hex);
  }
}
export default MoveAction;
