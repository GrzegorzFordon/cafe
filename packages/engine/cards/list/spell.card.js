import { SPELL_TARGET_TYPES } from "../../config.js";
import CardModel from "../card.model.js";

class SpellCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.targetType = options.targetType ?? SPELL_TARGET_TYPES.HEX;
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}

export default SpellCardModel;
