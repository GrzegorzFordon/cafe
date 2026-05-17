import { Hex } from "@cafe/shared/util/hex.js";

export const PLAYER_COUNT = 2;

export const BASE_HAND_SIZE = 5;

export const BOARD_SIZE = 3;

export const GAME_PHASES = {
  START: "START",
  UPKEEP: "UPKEEP",
  PLAN: "PLAN",
  RESOLVE: "RESOLVE",
  END: "END",
};

export const ZONES = {
  HAND: "HAND",
  BOARD: "BOARD",
  DISCARD: "DISCARD",
  DECK: "DECK",
};

export const BASE_HEX_MAP = new Map([
  [0, new Hex(0, 2, -2)],
  [1, new Hex(0, -2, 2)],
]);

// export const SPAWNS_HEX_MAP = new Map({
//   0: [
//     [0, new Hex(-1, 2, -1)],
//     [1, new Hex(1, 2, -3)],
//   ],
//   1: [
//     [0, new Hex(1, -2, 1)],
//     [1, new Hex(-1, -1, 2)],
//   ],
// });

export const TARGET_HEX_MAP = new Map([
  [0, new Hex(-2, 1, 1)],
  [1, new Hex(2, -1, -1)],
]);

export const BURN_TYPES = {
  POWER: "POWER",
  SPEED: "SPEED",
  MOVE: "MOVE",
  SHORE: "SHORE",
  PAY: "PAY",
};

export const SPELL_TARGET_TYPES = ["HEX", "UNIT"];
