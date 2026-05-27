import { Hex } from "@cafe/shared/util/hex.js";
import { BURN_TYPES, SPELL_TARGET_TYPES } from "../../../config.js";
import MoveUnitAbility from "../../abilities/moveUnit.ability.js";
import CardModel from "../../card.model.js";
import SpellCardModel from "../spell.card.js";

class SpellB extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S02";
    this.name = "Re-Spawn";
    this.speed = 6;
    this.burnEffects = [BURN_TYPES.MOVE];
    this.targetType = SPELL_TARGET_TYPES.UNIT;
    this.cardText = "Re-Spawn Unit";
  }

  onPlay(controller, target) {
    if (!target) return;
    const unitSpawn = new Hex(
      target.spawnHex.q,
      target.spawnHex.r,
      target.spawnHex.s,
    );
    const options = { playerID: this.playerID, unit: target, hex: unitSpawn };
    const moveAbility = new MoveUnitAbility(options);
    this.abilities.push(moveAbility);
    super.onPlay(controller, options);
  }
}
export default SpellB;
