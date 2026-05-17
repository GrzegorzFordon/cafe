import { BURN_TYPES } from "../../../config.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import SpellCardModel from "../spell.card.js";

class SpellB extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S02";
    this.name = "Spell B";
    this.speed = 3;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default SpellB;
