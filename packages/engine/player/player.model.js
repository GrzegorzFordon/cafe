// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";

class PlayerModel {
  constructor(options) {
    // this.id =
    this.hand = [];
    this.deck = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
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

  discardCard(id) {
    const card = this.hand.find((val) => val.id == id);
    if (!card) {
      console.log("CARD NOT FOUND");
      return;
    }
    this.discard.push(card);
    this.hand.filter((val) => val.id != id);
    eventEmitter.emit("sim:effect", new CardDiscardedEffect(card));
  }
}

export default PlayerModel;
