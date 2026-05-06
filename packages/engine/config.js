export const PLAYER_COUNT = 2;

export const BASE_HAND_SIZE = 5;

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
  [0, { q: 0, r: 2, s: -2 }],
  [1, { q: 0, r: -2, s: 2 }],
]);

const BURN_TYPES = ["POWER", "SPEED", "SHORE", "PAY", "MOVE"];
const SPELL_TARGET_TYPES = ["HEX", "UNIT"];
