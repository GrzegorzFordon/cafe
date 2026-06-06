import PawnModel from "../pawn.model.js";

class StructureModel extends PawnModel {
  constructor(options) {
    super(options);
    this.range = options.range ?? 1;
    this.isWalkable = options.isWalkable ?? false;
    this.unitsInRange = [];
  }

  get CanMove() {
    return false;
  }
}
export default StructureModel;
