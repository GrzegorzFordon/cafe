import { BURN_TYPES, SPELL_TARGET_TYPES } from "../../../config.js";
import DamageUnitAbility from "../../abilities/damageUnit.ability.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import SpellCardModel from "../spell.card.js";

class SpellZap extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S01";
    this.name = "zZzap!!";
    this.speed = 5;
    this.burnEffects = [BURN_TYPES.POWER, BURN_TYPES.SPEED];
    this.targetType = SPELL_TARGET_TYPES.UNIT;
    this.cardText = "Deal 3 Damage";
  }

  onPlay(controller, target) {
    if (!target) return;
    const options = { playerID: this.playerID, unit: target, amount: 3 };
    const damageAbility = new DamageUnitAbility(options);
    this.abilities.push(damageAbility);
    super.onPlay(controller, options);
  }
}
export default SpellZap;
