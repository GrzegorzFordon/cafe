import * as z from "zod";
import { GAME_PHASES } from "../config.js";
import { nanoid } from "nanoid";

// export const GameData = z.object({});

class GameModel {
  constructor(data) {
    this.id = nanoid();
    this.data = data;
  }
}

export default GameModel;

/**
 * game model holds:
 * wincondition data (turns unit stood on base)
 */
