import { BURN_TYPES } from "../../config";
import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, target) {
    super();
    this.unit = unit;
    this.target = target;
    this.name = "MOVE";
  }
}
export default MoveAction;
