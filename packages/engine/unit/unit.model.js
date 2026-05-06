// import * as z from "zod";

// export const UnitData = z.object({});
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { Hex } from "@cafe/shared/util/hex.js";
import { nanoid } from "nanoid";
import UnitMovedEffect from "../effect/effects/unitMoved.effect.js";
import UnitDamagedEffect from "../effect/effects/unitDamaged.effect.js";
import UnitDiedEffect from "../effect/effects/unitDied.effect.js";

class UnitModel {
  constructor(data) {
    this.id = nanoid();
    // this.data = data;
    // this.playerID = data.playerID;
    // this.cardID = data.cardID;
    this.unitID = data.unitID ?? 1;
    this.reach = 2;
    this.atk = Math.round(Math.random() * 10);
    this.hp = 1;
    // this.cardID = "LEADER";
    this.hex = data.hex;
    // this.hp = data.maxHP;
  }

  // get remainingHealth() {
  //   return 5;
  // }

  // init() {}

  spawn() {
    // ??
  }

  move(hex) {
    this.hex = hex;
    const effect = new UnitMovedEffect(this.id, hex);
    eventEmitter.emit("sim:effect", effect);
  }

  takeDamage(amount) {
    this.hp -= amount;
    const effect = new UnitDamagedEffect(this.id);
    eventEmitter.emit("sim:effect", effect);
    if (this.hp <= 0) this.die();
  }

  die() {
    const effect = new UnitDiedEffect(this.id);
    eventEmitter.emit("sim:effect", effect);
  }
}

export default UnitModel;
