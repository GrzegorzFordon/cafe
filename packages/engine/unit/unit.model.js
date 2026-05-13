// import * as z from "zod";

// export const UnitData = z.object({});
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { Hex } from "@cafe/shared/util/hex.js";
import { nanoid } from "nanoid";
import UnitMovedEffect from "../effect/effects/unitMoved.effect.js";
import UnitDamagedEffect from "../effect/effects/unitDamaged.effect.js";
import UnitDiedEffect from "../effect/effects/unitDied.effect.js";
// import { incrementCounter } from "../util/refCount.js";

class UnitModel {
  constructor(options) {
    // this.id = nanoid();
    // this.id = incrementCounter();
    this.id = options.id;
    // this.options = options;
    this.playerID = options.playerID;
    // this.cardID = options.cardID;
    // this.cardID = "LEADER";
    this.unitID = options.unitID ?? 1;
    this.reach = 1;
    this.hex = options.hex;
    this.atk = options.unitData.atk ?? 0;
    this.hp = options.unitData.hp ?? 0;
    this.speed = options.unitData.speed ?? 0;
  }

  // get remainingHealth() {
  //   return 5;
  // }

  // init() {}

  // onInit(){

  // }

  // onPlay(){

  // }

  spawn() {}

  move(controller, hex) {
    this.hex = hex;
    const effect = new UnitMovedEffect(this.id, hex);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  // takeDamage(controller,amount) {
  //   this.hp -= amount;
  //   const effect = new UnitDamagedEffect(this.id);
  //   controller.eventEmitter.emit("sim:effect", effect);
  //   if (this.hp <= 0) this.die();
  // }

  die(controller) {
    const effect = new UnitDiedEffect(this.id);
    controller.eventEmitter.emit("sim:effect", effect);
    controller.eventEmitter.emit("sim:inner:unitDeath", this.id);
  }
}

export default UnitModel;
