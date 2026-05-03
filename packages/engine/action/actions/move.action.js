import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, coords) {
    super();
    this.unit = unit;
    this.coords = coords;
  }

  name = "Move";

  execute(controller) {
    //get unit, move it
  }
}
export default MoveAction;
