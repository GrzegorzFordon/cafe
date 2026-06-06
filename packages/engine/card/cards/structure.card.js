import { SPELL_TARGET_TYPES, TARGET_OPTIONS } from "../../config.js";
import CardModel from "../card.model.js";

class StructureCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.targetType = SPELL_TARGET_TYPES.HEX;
    this.targetOptions = options.targetOptions ?? [TARGET_OPTIONS.EMPTY];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}

export default StructureCardModel;
