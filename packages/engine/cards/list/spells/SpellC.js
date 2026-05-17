import { BURN_TYPES } from "../../../config.js";
import CardModel from "../../card.model.js";
import SpellCardModel from "../spell.card.js";

class SpellC extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S03";
    this.name = "Spell C";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default SpellC;
