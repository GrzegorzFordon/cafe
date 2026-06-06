import { BURN_TYPES, TARGET_OPTIONS, UNIT_STATS } from "../../../config.js";
import UnitStatModifier from "../../../unit/modifier/unitStat.modifier.js";
import DamageUnitAbility from "../../abilities/damageUnit.ability.js";
import ModifyUnitAbility from "../../abilities/modifyUnit.ability.js";
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
    this.cardText = "Full Heal. +2 HP.";
  }

  onPlay(controller, target) {
    const missingHealthAmount = target.maxHp - target.hp;
    const options = {
      playerID: this.playerID,
      unit: target,
      amount: -missingHealthAmount,
    };
    const healAbility = new DamageUnitAbility(options);
    this.abilities.push(healAbility);

    const modifier = new UnitStatModifier({
      stat: UNIT_STATS.HEALTH,
      amount: 2,
    });
    const modifyAbility = new ModifyUnitAbility({
      playerID: this.playerID,
      unit: target,
      modification: modifier,
    });
    this.abilities.push(modifyAbility);
    super.onPlay(controller, target);
  }
}
export default UpgradeB;
