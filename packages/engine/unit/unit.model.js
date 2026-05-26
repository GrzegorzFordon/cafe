// import * as z from "zod";

// export const UnitData = z.object({});
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { Hex } from "@cafe/shared/util/hex.js";
import { nanoid } from "nanoid";
import UnitMovedEffect from "../effect/effects/unitMoved.effect.js";
import UnitDamagedEffect from "../effect/effects/unitDamaged.effect.js";
import UnitDiedEffect from "../effect/effects/unitDied.effect.js";
import UnitChargedEffect from "../effect/effects/unitCharged.effect.js";
import { UNIT_STATS } from "../config.js";
import UnitStatModifier from "./modifier/unitStat.modifier.js";
// import { incrementCounter } from "../util/refCount.js";

class UnitModel {
  constructor(options) {
    this.id = options.id;
    this.playerID = options.playerID;
    this.cardID = options.cardID;

    this.spawnHex = options.hex;
    this.hex = options.hex;

    this.unitID = options.unitID ?? 1;
    this.atk = options.unitData.atk ?? 0;
    this.hp = options.unitData.hp ?? 0;
    this.speed = options.unitData.speed ?? 0;
    this.reach = options.unitData.reach ?? 1;
    this.loot = options.unitData.loot ?? 1;
    this.ranged = options.unitData.ranged ?? 0;
    this.modifiers = [
      // new UnitStatModifier({ stat: UNIT_STATS.ATTACK, amount: 3 }),
    ];
  }

  get Attack() {
    let atkBonus = 0;
    this.modifiers.forEach((m) => {
      if (m.name === "Unit Stat" && m.stat === UNIT_STATS.ATTACK)
        atkBonus += m.amount;
    });
    return this.atk + atkBonus;
  }

  move(controller, hex) {
    this.hex = hex;
    const effect = new UnitMovedEffect(this.id, hex);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  takeDamage(controller, amount) {
    this.hp -= amount;
    const effect = new UnitDamagedEffect(this.id, amount);
    controller.eventEmitter.emit("sim:effect", effect);
    if (this.hp <= 0) this.die(controller);
  }

  die(controller) {
    const effect = new UnitDiedEffect(this.id);
    controller.eventEmitter.emit("sim:inner:unitDied", {
      unitID: this.id,
      spawnHex: this.spawnHex,
    });
    controller.eventEmitter.emit("sim:effect", effect);
  }

  addModifier(modifier) {
    this.modifiers.push(modifier);
  }
}

// UnitModel.Attack = () => {
//   let atkBonus = 0;
//   this.modifiers.forEach((m) => {
//     if (m.name === "Unit Stat" && m.stat === UNIT_STATS.ATTACK)
//       atkBonus += m.amount;
//   });
//   return this.atk + atkBonus;
// };

export default UnitModel;
