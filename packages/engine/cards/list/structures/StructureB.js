import { BURN_TYPES } from "../../../config.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";

class StructureB extends StructureCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0T02";
    this.name = "Structure B";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default StructureB;
