import { Hex } from "@cafe/shared/util/hex.js";
import { BOARD_SIZE } from "../config.js";

class BoardModel {
  constructor() {
    this.hexList = [];
    this.structures = new Map();
    this.spawns = new Map();
  }

  setupBoard(options) {
    const N = BOARD_SIZE;
    for (let q = -N; q <= N; q++) {
      const r1 = Math.max(-N, -q - N);
      const r2 = Math.min(N, -q + N);
      for (let r = r1; r <= r2; r++) {
        if (q !== 0 || r !== 0) this.hexList.push(new Hex(q, r, -q - r));
      }
    }
  }

  getLegalMoves(hex, reach, isDiagonal) {
    const dirs = isDiagonal ? Hex.diagonals : Hex.directions;
    const moves = [];
    const startHex = new Hex(hex.q, hex.r, hex.s);
    dirs.forEach((dir) => {
      for (let i = 1; i < reach + 1; i++) {
        const nextHex = startHex.add(dir.scale(i));
        if (this.hexList.some((h) => h.isEqual(nextHex))) moves.push(nextHex);
        else break;
      }
    });
    return moves;
  }

  updateSpawns(unit, spawn, isAdd) {
    if (isAdd) this.spawns.set(new Hex(spawn.q, spawn.r, spawn.s), unit);
    else this.spawns.delete(spawn);
  }

  spawnStructure(structure, hex) {
    this.structures.set(hex, structure);
  }
}

export default BoardModel;
