import { BURN_TYPES, TARGET_OPTIONS } from "../../../config.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";
import UpgradeCardModel from "../upgrade.card.js";

class UpgradeB extends UpgradeCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0G02";
    this.name = "Upgrade B";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
    this.targetOptions = [TARGET_OPTIONS.FRIENDLY];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UpgradeB;
