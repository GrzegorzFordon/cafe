import { Hex } from "@cafe/shared/util/hex.js";

class BoardModel {
  constructor() {
    this.hexList = [];
    this.structures = [];
  }

  setupBoard(options) {
    const N = 2;
    for (let q = -N; q <= N; q++) {
      const r1 = Math.max(-N, -q - N);
      const r2 = Math.min(N, -q + N);
      for (let r = r1; r <= r2; r++) {
        this.hexList.push(new Hex(q, r, -q - r));
      }
    }
  }

  getLegalMoves(hex, reach, isDiagonal) {
    const dirs = isDiagonal ? Hex.diagonals : Hex.directions;
    const moves = [];
    const startHex = new Hex(hex.q, hex.r, hex.s);
    for (let i = 1; i < reach + 1; i++)
      dirs.forEach((val) => {
        const nextHex = startHex.add(val.scale(i));
        if (this.hexList.some((h) => h.isEqual(nextHex))) moves.push(nextHex);
      });
    return moves;
  }
}

export default BoardModel;
