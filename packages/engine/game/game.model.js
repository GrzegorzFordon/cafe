import * as z from "zod";
import { GAME_PHASES } from "../config.js";
import { nanoid } from "nanoid";

// export const GameData = z.object({});

class GameModel {
  constructor(options) {
    this.id = nanoid();
    this.winCount = new Map();
  }
}

export default GameModel;

/**
 * game model holds:
 * wincondition data (turns unit stood on base)
 */
