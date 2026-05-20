import { BURN_TYPES } from "../../config";
import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, hex) {
    super();
    this.unit = unit;
    this.hex = hex;
    this.name = "MOVE";
  }
}
export default MoveAction;
