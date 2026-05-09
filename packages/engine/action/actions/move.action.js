import Action from "../action.model";

class MoveAction extends Action {
  constructor(unit, hex) {
    super();
    this.unit = unit;
    this.hex = hex;
  }

  name = "Move";

  //TODO move some of the logic into board controller (getting path etc)
  execute(controller) {
    const legalMoves = controller.boardController.getLegalMoves(this.unit);
    if (!legalMoves.find((v) => this.hex)) return;

    const dist = this.hex.distance(this.unit.hex);
    let goalHex = this.unit.hex;

    for (let i = 1; i <= dist; i++) {
      const nextHex = this.unit.hex.lerp(this.hex, i / dist);

      const occupant = controller.unitController.getUnitAtHex(nextHex);
      if (occupant) {
        if (this.unit.playerID === occupant.playerID) {
          controller.unitController.moveUnit(this.unit.id, goalHex);
          break;
        }
        controller.unitController.moveUnit(this.unit.id, goalHex);
        controller.unitController.handleCombat(this.unit, occupant, nextHex);
        break;
      }
      goalHex = nextHex;
      // console.log(this.unit.id, nextHex, occupant?.id ?? "empty");
    }
    if (goalHex.isEqual(this.hex))
      controller.unitController.moveUnit(this.unit.id, goalHex);
  }
}
export default MoveAction;
