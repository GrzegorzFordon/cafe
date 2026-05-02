// import * as z from "zod";

import { eventEmitter } from "../../../apps/frontend/src/util/eventEmitter.js";

// export const PlayerModel = z.object({
//   heroID: z.string(),
//   deck: z.array(),
//   hand: z.array(),
//   discard: z.array(),
//   units: z.array(),
// });

class PlayerModel {
  constructor(options) {
    // this.id =
    this.hand = [];
    this.deck = [];
    this.discard = [];
  }

  draw() {
    const card = this.deck.shift();
    this.hand.push(card);
    eventEmitter.emit("player:draw", card);
  }
}

export default PlayerModel;
