//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../shared/eventEmitter.js";
import { BASE_COORDS, OP_BASE_COORDS } from "../config.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect.js";
import UnitModel from "./unit.model.js";

class UnitController {
  constructor() {
    this.units = [];
  }

  init(options) {
    this.spawnUnit(options?.leader, BASE_COORDS);
    this.spawnUnit(2, OP_BASE_COORDS);
    // console.log("Unit Controller is running", this.units);
  }

  spawnUnit(unitID, hex) {
    const unit = new UnitModel({ unitID, hex });
    this.units.push(unit);
    console.log("Unit Controller spawned Unit", unit);
    eventEmitter.emit("sim:effect", new UnitSpawnedEffect(unit));
  }

  moveUnit(unitID, hex) {
    const unit = this.units.find((val) => val.id == unitID);
    unit.move(hex);
  }

  /**
   * COMBAT
   */
  combatStart(attackerUnitID, defenderUnitID, hex) {}
}

export default UnitController;
