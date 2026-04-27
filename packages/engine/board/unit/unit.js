/**
 * pawn state, actions, object

state
*card
*tile
*player
 */

class Unit {
  constructor() {
    this.playerID = "PlayerID";
    this.coords = {
      q: 0,
      r: 0,
      s: 0,
    };
  }

  moveTo(coords) {
    this.coords = coords;
  }
}
export default Unit;
