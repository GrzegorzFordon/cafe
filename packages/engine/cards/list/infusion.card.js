import { SPELL_TARGET_TYPES } from "../../config.js";
import CardModel from "../card.model.js";

class InfusionCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.playable = false;
    this.targetType = SPELL_TARGET_TYPES.NONE;
    this.speed = 0;
  }
}

export default InfusionCardModel;
