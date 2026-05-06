import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, hex) {
    super();
    this.unit = unit;
    this.hex = hex;
  }

  name = "Move";

  execute(controller) {
    //fist, check if this action represents a legal move
    const legalMoves = controller.boardController.getLegalMoves(this.unit);
    if (!legalMoves.find((v) => this.hex)) return;

    //get unit, move it TODO change to move tile by tile
    controller.unitController.moveUnit(this.unit.id, this.hex);
  }
}
export default MoveAction;

/**
 * change to be direction + distance
 */
