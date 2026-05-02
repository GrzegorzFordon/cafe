// import * as z from "zod";

// export const UnitData = z.object({});
import { Hex } from "@cafe/shared/util/hex.js";
import { nanoid } from "nanoid";

class UnitModel {
  constructor(data) {
    this.id = nanoid();
    // this.data = data;
    this.playerID = data.playerID;
    // this.cardID = data.cardID;
    this.unitID = 1;
    this.cardID = "LEADER";
    this.coords = new Hex(data.coords.q, data.coords.r, data.coords.s);
    this.hp = data.maxHP;
  }

  // get remainingHealth() {
  //   return 5;
  // }

  // init() {}

  spawn() {
    // ??
  }

  move(coords) {
    //move unit to new coords
    this.coords = coords;
  }

  takeDamage(amount) {
    this.hp -= amount;
    //take_damage event
    if (this.hp <= 0) this.die();
  }

  die() {
    //die
    //unit:die event
  }
}

export default UnitModel;
