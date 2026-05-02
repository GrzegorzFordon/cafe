// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";

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
    this.deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.discard = [];
  }

  shuffle() {
    //Fisher–Yates shuffle
    let index = this.deck.length;
    while (index != 0) {
      let rndIndex = Math.floor(Math.random() * index);
      index--;
      [this.deck[index], this.deck[rndIndex]] = [
        this.deck[rndIndex],
        this.deck[index],
      ];
    }
  }

  draw() {
    const cardID = this.deck.shift();
    const card = new CardModel({ cardID });
    this.hand.push(card);
    eventEmitter.emit("sim:effect", new CardDrawnEffect(card));
  }
}

export default PlayerModel;
