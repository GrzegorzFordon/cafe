/**
 * the grid (the tiles) (hash map??)
 * pawns (all, players also have map of their own units) (maybe in tiles)
 * getLegalMoveTargets(player,unit)
 * moveUnit(player,unit,target)
 **/

import UnitModel from "../unit/unit.model.js";

class BoardController extends Controller {
  constructor() {
    this.tiles = [];
    this.units = [];
  }

  init(options){
    //setup, options come from game controller
  }

  spawnUnit(unitID, coords) {
    const newUnit = new UnitModel();
    this.units.push(newUnit);
  }

  moveUnit(unitID, coords) {
    const unit = this.units.find((val) => val.unitID == unitID);
  }

}

export default BoardController;
