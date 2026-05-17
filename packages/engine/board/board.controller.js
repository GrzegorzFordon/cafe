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

class BoardController extends Controller {
  constructor(game) {
    super(game);
    this.model = new BoardModel();
  }

  init(options) {
    this.model = new BoardModel(options);
    this.model.setupBoard();
    // console.log("Board Controller running", this.model);
  }

  getLegalMoves(unit, bonus) {
    // console.log(unit, bonus);
    if (!unit) return undefined;
    return this.model.getLegalMoves(unit.hex, unit.reach + bonus ?? 1, false);
  }

  resolveMove(unit, hex, bonuses) {
    // console.log("[Board Controller] Resolving Move", unit, hex, bonuses);
    const speedBonusAmount = bonuses.filter((val) =>
      val.burnEffects.includes(BURN_TYPES.MOVE),
    ).length;

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
        this.game.unitController.moveUnit(unit.id, goalHex);
        if (unit.playerID !== occupant.playerID) {
          this.game.unitController.handleCombat(unit.id, occupant.id, nextHex);
        }
        break;
      }
      goalHex = nextHex;
    }
    if (goalHex.isEqual(targetHex))
      this.game.unitController.moveUnit(unit.id, goalHex);
  }
}

export default BoardController;
