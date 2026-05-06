//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../shared/eventEmitter.js";
import { BASE_HEX_MAP } from "../config.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect.js";
import UnitModel from "./unit.model.js";

class UnitController {
  constructor() {
    this.units = [];
  }

  init(options) {
    this.spawnUnit(options?.leader, BASE_HEX_MAP.get(0));
    this.spawnUnit(2, BASE_HEX_MAP.get(1));
  }

  spawnUnit(unitID, hex) {
    const unit = new UnitModel({ unitID, hex });
    this.units.push(unit);
    eventEmitter.emit("sim:effect", new UnitSpawnedEffect(unit));
  }

  moveUnit(unitID, hex) {
    const unit = this.units.find((val) => val.id == unitID);
    unit.move(hex);
  }

  /**
   * COMBAT
   */
  combatStart(attackerUnitID, defenderUnitID, hex) {
    /**
     * Compare the attack values of both units.
     * If the Attacker has more atk, deal one damage to the defender (and what)
     * If the Attacker has less atk or it is a tie, move the attacker back one spot (also thorns keyword for fightback)
     */
  }
}

export default UnitController;
