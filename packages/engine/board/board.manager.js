/**
 * the grid (the tiles) (hash map??)
 * pawns (all, players also have map of their own units) (maybe in tiles)
 * getLegalMoveTargets(player,unit)
 * moveUnit(player,unit,target)
 **/

class Board {
  constructor() {
    this.tiles = [];
    this.units = [];
  }

  spawnUnit(unitID,coords) {}
}

export default Board;
