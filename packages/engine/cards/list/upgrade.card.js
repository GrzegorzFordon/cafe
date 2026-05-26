import { SPELL_TARGET_TYPES } from "../../config.js";
import CardModel from "../card.model.js";

class UpgradeCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.targetType = SPELL_TARGET_TYPES.UNIT;
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}

export default UpgradeCardModel;
