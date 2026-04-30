/**
 * tile state, actions, object

type (+owner)
state
pawn
effect (flooded,...)
 */

class Tile {
  constructor() {
    this.unit = undefined;
    this.coords = {
      q: 0,
      r: 0,
      s: 0,
    };
  }
}
export default Tile;
