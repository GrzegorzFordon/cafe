//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../shared/eventEmitter.js";
import { BASE_HEX_MAP } from "../config.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect.js";
import CombatStartedEffect from "../effect/effects/combatStarted.effect.js";
import UnitModel from "./unit.model.js";
import Controller from "../controller.js";

class UnitController extends Controller {
  constructor(game) {
    super(game);
    this.game = game;
    this.units = [];
  }

  init(options) {
    this.spawnUnit(1, options?.leader ?? 1, BASE_HEX_MAP.get(0), {
      atk: 1,
      hp: 2,
      speed: 3,
    });
    this.spawnUnit(2, 2, BASE_HEX_MAP.get(1), { atk: 1, hp: 2, speed: 3 });
  }

  spawnUnit(playerID, unitID, hex, unitData) {
    const unit = new UnitModel({ playerID, unitID, hex, unitData });
    this.units.push(unit);
    this.game.eventEmitter.emit("sim:effect", new UnitSpawnedEffect(unit));
  }

  moveUnit(unitID, hex) {
    const unit = this.units.find((val) => val.id == unitID);
    unit.move(this.game, hex);
  }

  /**
   * COMBAT
   */
  handleCombat(attackerUnit, defenderUnit, hex) {
    // console.log("Comparing Atk Values:", attackerUnit.atk, defenderUnit.atk);
    const effect = new CombatStartedEffect(attackerUnit.id, defenderUnit.id);
    this.game.eventEmitter.emit("sim:effect", effect);
    if (attackerUnit.atk >= defenderUnit.atk) {
      this.units.filter((val) => val != defenderUnit);
      defenderUnit.die(this.game);
    }
  }

  getUnitAtHex(hex) {
    return this.units.find((val) => val.hex.isEqual(hex));
  }
}

export default UnitController;
