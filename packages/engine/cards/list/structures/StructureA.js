import { BURN_TYPES } from "../../../config.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";

class StructureA extends StructureCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0T01";
    this.name = "Structure A";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default StructureA;
