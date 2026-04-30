import * as z from "zod";

export const UnitData = z.object({});

class UnitModel {
  constructor(data) {
    this.data = data;
  }

  get remainingHealth() {
    return 5;
  }

  init() {}
  move() {}
  takeDamage() {}
  die() {}
}

export default UnitModel;

/**
 * /**
 * pawn state, actions, object

state
*card
*tile
*player
 */

// class Unit {
//   constructor(id) {
//     // this.id = id;
//     this.playerID = "PlayerID";
//     this.coords = {
//       q: 0,
//       r: 0,
//       s: 0,
//     };
//   }

//   moveTo(coords) {
//     this.coords = coords;
//   }
// }
// export default Unit;
