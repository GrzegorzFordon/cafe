import { BURN_TYPES, UNIT_STATS } from "../../../config.js";
import UnitStatModifier from "../../../unit/modifier/unitStat.modifier.js";
import ModifyUnitAbility from "../../abilities/modifyUnit.ability.js";
import CardModel from "../../card.model.js";
import StructureCardModel from "../structure.card.js";
import UpgradeCardModel from "../upgrade.card.js";

class UpgradeA extends UpgradeCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0G01";
    this.name = "Upgrade A";
    this.speed = 7;
    this.burnEffects = [BURN_TYPES.MOVE];
  }

  onPlay(controller, target) {
    const modifier = new UnitStatModifier({
      stat: UNIT_STATS.ATTACK,
      amount: 5,
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
export default UpgradeA;
