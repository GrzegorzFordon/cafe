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
      atk: 2,
      hp: 6,
      speed: 3,
      reach: 2,
    };
    const statsB = {
      atk: 5,
      hp: 4,
      speed: 2,
      reach: 2,
    };
    const statsMinion = {
      atk: 0,
      hp: 2,
      speed: 6,
      reach: 3,
    };
    const statsMinionB = {
      atk: 1,
      hp: 1,
      speed: 5,
      reach: 3,
    };
    const ids = this.game.options.players.map((p) => p.id);
    this.spawnUnit(ids[0], "0L01", BASE_HEX_MAP.get(0).neighbor(1), stats);
    this.spawnUnit(ids[0], "0L03", BASE_HEX_MAP.get(0).neighbor(4), statsB);
    this.spawnUnit(ids[0], "0U01", BASE_HEX_MAP.get(0).neighbor(2), statsMinion);
    this.spawnUnit(
      ids[1] ?? 13,
      "0L02",
      BASE_HEX_MAP.get(1).neighbor(3),
      stats,
    );
    this.spawnUnit(
      ids[1] ?? 13,
      "0U02",
      BASE_HEX_MAP.get(1).neighbor(1),
      statsMinionB,
    );
    this.spawnUnit(
      ids[1] ?? 13,
      "0U02",
      BASE_HEX_MAP.get(1).neighbor(2),
      statsMinionB,
    );
    this.spawnUnit(
      ids[1] ?? 13,
      "0U02",
      BASE_HEX_MAP.get(1).neighbor(4),
      statsMinionB,
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
  handleCombat(attackerUnitID, defenderUnitID, hex) {
    // console.log(attackerUnitID, defenderUnitID, this.units);
    const attacker = this.units.find((val) => val.id == attackerUnitID);
    const defender = this.units.find((val) => val.id == defenderUnitID);
    const attackerAtk = attacker.atk;
    const defenderAtk = defender.atk;
    const effect = new CombatStartedEffect(attackerUnitID, defenderUnitID);
    this.game.eventEmitter.emit("sim:effect", effect);
    defender.takeDamage(this.game, attackerAtk);
    // attacker.takeDamage(this.game, defenderAtk);
    // if (attackerUnit.atk >= defenderUnit.atk) {
    //   // this.units = this.units.filter((val) => val != defenderUnit);
    //   defenderUnit.die(this.game);
    // }
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
