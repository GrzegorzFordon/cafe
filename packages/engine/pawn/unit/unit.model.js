// import * as z from "zod";

// export const UnitData = z.object({});
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { Hex } from "@cafe/shared/util/hex.js";
import { nanoid } from "nanoid";
import UnitMovedEffect from "../../effect/effects/unitMoved.effect.js";
import UnitDamagedEffect from "../../effect/effects/unitDamaged.effect.js";
import UnitDiedEffect from "../../effect/effects/unitDied.effect.js";
import UnitChargedEffect from "../../effect/effects/unitCharged.effect.js";
import { UNIT_STATS } from "../../config.js";
import UnitStatModifier from "../modifier/unitStat.modifier.js";
import PawnModel from "../pawn.model.js";
// import { incrementCounter } from "../util/refCount.js";

class UnitModel extends PawnModel {
  constructor(options) {
    super(options);
    this.spawnHex = options.hex;

    this.unitID = options.unitID ?? 1;
    this.atk = options.unitData.atk ?? 0;

    this.speed = options.unitData.speed ?? 0;
    this.reach = options.unitData.reach ?? 1;
    this.hubris = options.unitData.hubris ?? 1;
  }

  get Attack() {
    let atkBonus = 0;
    this.modifiers.forEach((m) => {
      // if (m.name === "Unit Stat" && m.stat === UNIT_STATS.ATTACK)
      //   atkBonus += m.amount;
      atkBonus = m(atkBonus);
    });
    return this.atk + atkBonus;
  }

  get CanAttack() {
    let canAttack = true;
    this.modifiers.forEach((m) => {
      canAttack = m(canAttack);
    });
    return canAttack;
  }

  get CanMove() {
    let canMove = true;
    this.modifiers.forEach((m) => {
      canMove = m(canMove);
    });
    return canMove;
  }

  onDestroy(controller) {
    const effect = new UnitDiedEffect(this.id);
    controller.eventEmitter.emit("sim:effect", effect);
  }
}

export default UnitModel;
