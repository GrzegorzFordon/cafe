import * as z from "zod";
import { GAME_PHASES } from "../config.js";

// export const GameData = z.object({});

class GameModel {
  constructor(data) {
    this.data = data;
  }
}

export default GameModel;

/**
 * game model holds:
 * activePhase 
 */