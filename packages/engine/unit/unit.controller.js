//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../../apps/frontend/src/util/eventEmitter.js";
import { BASE_COORDS } from "../config.js";
import UnitModel from "./unit.model.js";

class UnitController {
  constructor() {
    this.units = [];
  }

  init(options) {
    this.spawnUnit(options?.leader, BASE_COORDS);
    // console.log("Unit Controller is running", this.units);
  }

  spawnUnit(unitID, coords) {
    const unit = new UnitModel({ unitID, coords });
    this.units.push(unit);
    // console.log("Unit Controller spawned Unit", unit);
    eventEmitter.emit("unit:spawn", unit);
  }

  moveUnit(unitID, coords) {
    const unit = this.units.find((val) => val.unitID == unitID);
  }

  /**
   * COMBAT
   */
  combatStart(attackerUnitID, defenderUnitID, coords) {}
}

export default UnitController;
