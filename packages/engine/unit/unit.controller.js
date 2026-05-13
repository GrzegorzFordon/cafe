//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../shared/eventEmitter.js";
import { BASE_HEX_MAP } from "../config.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect.js";
import CombatStartedEffect from "../effect/effects/combatStarted.effect.js";
import UnitModel from "./unit.model.js";
import Controller from "../controller.js";
import { Hex } from "@cafe/shared/util/hex.js";

class UnitController extends Controller {
  constructor(game) {
    super(game);
    this.game = game;
    this.units = [];
    this.onUnitDeathCallback = this.onUnitDeathCallback.bind(this);
    this.autoIncrement = 0;
  }

  init() {
    const stats = {
      atk: 1,
      hp: 2,
      speed: 3,
    };

    this.spawnUnit(
      this.game.options.players[0].id,
      "0L01",
      BASE_HEX_MAP.get(0),
      stats,
    );
    this.spawnUnit(
      this.game.options.players[1]?.id ?? 13,
      "0L02",
      BASE_HEX_MAP.get(1),
      stats,
    );
    this.game.eventEmitter.on("sim:inner:unitDeath", this.onUnitDeathCallback);
  }

  //not implemented
  shutdown() {
    this.game.eventEmitter.off("sim:inner:unitDeath", this.onUnitDeathCallback);
  }

  spawnUnit(playerID, unitID, hex, unitData) {
    const unit = new UnitModel({
      playerID,
      unitID,
      hex,
      unitData,
      id: this.autoIncrement++,
    });
    this.units.push(unit);
    this.game.eventEmitter.emit("sim:effect", new UnitSpawnedEffect(unit));
  }

  moveUnit(unitID, hex) {
    const unit = this.units.find((val) => val.id == unitID);
    if (!unit) return;
    unit.move(this.game, hex);
  }

  /**
   * COMBAT
   */
  handleCombat(attackerUnit, defenderUnit, hex) {
    const effect = new CombatStartedEffect(attackerUnit.id, defenderUnit.id);
    this.game.eventEmitter.emit("sim:effect", effect);
    if (attackerUnit.atk >= defenderUnit.atk) {
      // this.units = this.units.filter((val) => val != defenderUnit);
      defenderUnit.die(this.game);
    }
  }

  getUnitAtHex(hex) {
    return this.units.find((val) =>
      new Hex(val.hex.q, val.hex.r, val.hex.s).isEqual(hex),
    );
  }

  onUnitDeathCallback(id) {
    this.units = this.units.filter((unit) => unit.id !== id);
  }
}

export default UnitController;
