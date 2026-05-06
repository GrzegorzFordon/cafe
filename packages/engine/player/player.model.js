// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";

class PlayerModel {
  constructor(options, playerID) {
    this.playerID = playerID;
    this.hand = [];
    this.deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
    eventEmitter.emit("sim:effect", new CardDrawnEffect(this.playerID, card));
  }

  discardCard(id) {
    const card = this.hand.find((val) => val.id == id);
    if (!card) {
      console.log("CARD NOT FOUND");
      return;
    }
    this.discard.push(card);
    this.hand = this.hand.filter((val) => val.id != card.id);
    eventEmitter.emit("sim:effect", new CardDiscardedEffect(this.playerID, card));
  }
}

export default PlayerModel;
