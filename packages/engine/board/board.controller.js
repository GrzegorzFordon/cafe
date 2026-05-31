/**
 * the grid (the tiles) (hash map??)
 * pawns (all, players also have map of their own units) (maybe in tiles)
 * getLegalMoveTargets(player,unit)
 * moveUnit(player,unit,target)
 **/
import { Hex } from "@cafe/shared/util/hex.js";
import { BURN_TYPES } from "../config.js";
import Controller from "../controller.js";
import BoardModel from "./board.model.js";
import SpawnUsedEffect from "../effect/effects/spawnUsed.effect.js";
import SpawnFreedEffect from "../effect/effects/spawnFreed.effect.js";

class BoardController extends Controller {
  constructor(game) {
    super(game);
    this.model = new BoardModel();
  }

  handleUnitSpawn(e) {
    this.model.updateSpawns(e.unit, e.hex, true);
    const effect = new SpawnUsedEffect(e.hex, e.unit);
    this.game.eventEmitter.emit("sim:effect", effect);
  }
  handleUnitDeath(e) {
    this.model.updateSpawns(e.unit, e.spawnHex, false);
    const effect = new SpawnFreedEffect(e.spawnHex);
    this.game.eventEmitter.emit("sim:effect", effect);
  }

  async init(options) {
    this.model = new BoardModel(options);
    await this.model.setupBoard();

    // console.log("Board Controller running", this.model);
    this.game.eventEmitter.on("sim:inner:unitSpawned", (e) =>
      this.handleUnitSpawn(e),
    );
    this.game.eventEmitter.on("sim:inner:unitDied", (e) =>
      this.handleUnitDeath(e),
    );
  }

  //not implemented
  shutdown() {
    this.game.eventEmitter.off("sim:inner:unitSpawned", (e) =>
      this.handleUnitSpawn(e),
    );
    this.game.eventEmitter.off("sim:inner:unitDied", (e) =>
      this.handleUnitDeath(e),
    );
  }

  getLegalMoves(unit, bonus) {
    // console.log(unit, bonus);
    if (!unit) return undefined;
    return this.model.getLegalMoves(unit.hex, unit.reach + bonus ?? 1, false);
  }

  get SpawnInfo() {
    return this.model.spawns;
  }

  resolveMove(unit, hex, bonuses) {
    // console.log("[Board Controller] Resolving Move", unit, hex, bonuses);

    let speedBonusAmount = 0;
    let powerBonusAmount = 0;
    let moveBonusAmount = 0;
    bonuses.forEach((val) => {
      speedBonusAmount += val.burnEffects.filter(
        (val) => val === BURN_TYPES.SPEED,
      ).length;
      powerBonusAmount += val.burnEffects.filter(
        (val) => val === BURN_TYPES.POWER,
      ).length;
      moveBonusAmount += val.burnEffects.filter(
        (val) => val === BURN_TYPES.MOVE,
      ).length;
    });

    const legalMoves = this.getLegalMoves(unit, speedBonusAmount);
    if (!legalMoves.find((v) => hex)) return;

    const unitHex = new Hex(unit.hex.q, unit.hex.r, unit.hex.s);
    const targetHex = new Hex(hex.q, hex.r, hex.s);

    const dist = new Hex(hex.q, hex.r, hex.s).distance(unit.hex);
    let goalHex = unitHex;

    for (let i = 1; i <= dist; i++) {
      const nextHex = unitHex.lerp(targetHex, i / dist);
      const occupant = this.game.unitController.getUnitAtHex(nextHex);
      if (occupant) {
        this.game.unitController.moveUnit(unit.id, goalHex, false);
        if (unit.playerID !== occupant.playerID) {
          this.game.unitController.handleCombat(
            unit.id,
            occupant.id,
            nextHex,
            powerBonusAmount,
          );
        }
        break;
      }
      goalHex = nextHex;
    }
    if (goalHex.isEqual(targetHex))
      this.game.unitController.moveUnit(unit.id, goalHex, false);
  }
}

export default BoardController;
