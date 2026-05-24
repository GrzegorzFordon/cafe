import { BURN_TYPES } from "../../../config.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";

class UpgradeB extends StructureCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0G02";
    this.name = "Upgrade B";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UpgradeB;
