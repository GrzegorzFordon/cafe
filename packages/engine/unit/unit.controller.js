//maybe not needed? no actually we need init, die, stats

import { eventEmitter } from "../../shared/eventEmitter.js";
import { BASE_HEX_MAP } from "../config.js";
import UnitSpawnedEffect from "../effect/effects/unitSpawned.effect.js";
import CombatStartedEffect from "../effect/effects/combatStarted.effect.js";
import UnitModel from "./unit.model.js";
import Controller from "../controller.js";
import { Hex } from "@cafe/shared/util/hex.js";
import ExhaustedModifier from "./modifier/exhausted.modifier.js";
import UnitModifiedEffect from "../effect/effects/unitModified.effect.js";

class UnitController extends Controller {
  constructor(game) {
    super(game);
    this.game = game;
    this.units = [];
    this.onUnitDeathCallback = this.onUnitDeathCallback.bind(this);
    this.autoIncrement = 0;
  }

  init() {
    this.spawnInitialUnits();
    this.game.eventEmitter.on("sim:inner:unitDied", this.onUnitDeathCallback);
  }

  //not implemented
  shutdown() {
    this.game.eventEmitter.off("sim:inner:unitDied", this.onUnitDeathCallback);
  }

  spawnInitialUnits() {
    const stats = {
      atk: 2,
      hp: 6,
      speed: 3,
      reach: 1,
    };
    const statsB = {
      atk: 5,
      hp: 4,
      speed: 2,
      reach: 1,
    };
    const statsMinion = {
      atk: 0,
      hp: 2,
      speed: 6,
      reach: 2,
    };
    const statsMinionB = {
      atk: 1,
      hp: 1,
      speed: 5,
      reach: 1,
    };
    const ids = this.game.options.players.map((p) => p.id);
    this.spawnUnit(ids[0], "0L01", BASE_HEX_MAP.get(0).neighbor(1), stats);
    // this.spawnUnit(ids[0], "0L03", BASE_HEX_MAP.get(0).neighbor(4), statsB);
    this.spawnUnit(
      ids[0],
      "0U01",
      BASE_HEX_MAP.get(0).neighbor(2),
      statsMinion,
    );
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
    // this.spawnUnit(
    //   ids[1] ?? 13,
    //   "0U02",
    //   BASE_HEX_MAP.get(1).neighbor(4),
    //   statsMinionB,
    // );
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
    this.game.eventEmitter.emit("sim:effect", new UnitSpawnedEffect(unit, hex));
    this.game.eventEmitter.emit(
      "sim:inner:unitSpawned",
      new UnitSpawnedEffect(unit, hex),
    );
  }

  moveUnit(unitID, hex, exhaust = true) {
    const unit = this.units.find((val) => val.id == unitID);
    if (!unit) return;
    unit.move(this.game, hex);

    if (exhaust) {
      const modifier = new ExhaustedModifier();
      this.modifyUnit(unitID, modifier);
    }
  }

  // teleportUnit(unitID, hex) {
  //   const unit = this.units.find((val) => val.id == unitID);
  //   if (!unit) return;
  //   unit.move(this.game, hex);
  // }

  modifyUnit(unitID, modifier) {
    const unit = this.units.find((val) => val.id === unitID);
    if (!unit) return;
    unit.addModifier(modifier);
    const effect = new UnitModifiedEffect(unit.id, modifier, true);
    this.game.eventEmitter.emit("sim:effect", effect);
  }

  damageUnit(unitID, amount) {
    const unit = this.units.find((val) => val.id == unitID);
    if (!unit) return;
    unit.takeDamage(this.game, amount);
  }

  handleCombat(attackerUnitID, defenderUnitID, hex, powerBonusAmount) {
    const attacker = this.units.find((val) => val.id == attackerUnitID);
    const defender = this.units.find((val) => val.id == defenderUnitID);
    const attackerAtk = attacker.Attack;
    // const defenderAtk = defender.atk;
    const effect = new CombatStartedEffect(attackerUnitID, defenderUnitID);
    this.game.eventEmitter.emit("sim:effect", effect);
    defender.takeDamage(this.game, attackerAtk + powerBonusAmount);
  }

  getUnitAtHex(hex) {
    return this.units.find((val) =>
      new Hex(val.hex.q, val.hex.r, val.hex.s).isEqual(hex),
    );
  }

  onUnitDeathCallback(data) {
    this.units = this.units.filter((unit) => unit.id !== data.unitID);
  }

  readyAllUnits() {
    this.units.forEach((unit) => {
      // console.log(unit.modifiers);
      const isExhausted = unit.modifiers.find(
        (val) => val.name === "Exhausted",
      );
      if (!isExhausted || !unit) return;
      unit.modifiers = unit.modifiers.filter((val) => val.name !== "Exhausted");
      const modifier = new ExhaustedModifier();
      const effect = new UnitModifiedEffect(unit.id, modifier, false);
      this.game.eventEmitter.emit("sim:effect", effect);
    });
  }

  isFriendly(playerID, unitID) {
    const unit = this.units.find((unit) => unit.id === unitID);
    if (!unit) return false;
    return unit.playerID === playerID;
  }
}

export default UnitController;
