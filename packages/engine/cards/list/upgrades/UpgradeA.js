import { BURN_TYPES } from "../../../config.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";

class UpgradeA extends StructureCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0G01";
    this.name = "Upgrade A";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UpgradeA;
