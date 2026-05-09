// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import { CardList } from "../cards/cardList.js";

class PlayerModel {
  constructor(options, playerID) {
    this.playerID = playerID;
    this.hand = [];
    this.deck = [
      "0U01",
      "0U01",
      "0U01",
      "0U01",
      "0U01",
      "0U02",
      "0U03",
      "0U04",
      "0U05",
      "0U06",
      "0U07",
      "0U08",
      "0U09",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
    ];
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
    const cardModel = CardList.get(cardID);
    const card = new cardModel({ playerID: this.playerID, cardID });
    this.hand.push(card);
    eventEmitter.emit("sim:effect", new CardDrawnEffect(this.playerID, card));
    // eventEmitter.emit("sim:effect", new CardDrawnEffect(this.playerID, cardID));
    // this.hand.push(cardID);
  }

  discardCard(id) {
    const card = this.hand.find((val) => val.id == id);
    if (!card) {
      console.log("CARD NOT FOUND");
      return;
    }
    this.discard.push(card);
    this.hand = this.hand.filter((val) => val.id != card.id);
    eventEmitter.emit(
      "sim:effect",
      new CardDiscardedEffect(this.playerID, card),
    );
  }
}

export default PlayerModel;
