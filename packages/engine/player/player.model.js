// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import { CardList } from "../cards/cardList.js";
import PlayerActionsCountEffect from "../effect/effects/playerActionsCount.effect.js";
import uniformFloat from "../util/prng.js";
import { BURN_TYPES } from "../config.js";
import CardShuffledBackIntoDeckEffect from "../effect/effects/cardShuffledIntoDeck.effect.js";

class PlayerModel {
  constructor(options, playerID, isFirstPlayer) {
    this.playerID = playerID;
    this.hand = [];
    this.deck = [
      "0U01",
      "0U01",
      // "0U02",
      // "0U02",
      // "0U03",
      // "0U03",
      "0I01",
      // "0I01",
      // "0I02",
      // "0I02",
      "0S01",
      // "0S01",
      // "0S02",
      // "0S02",
      // "0S03",
      // "0S03",
      // "0T01",
      // "0T01",
      // "0T02",
      "0T02",
      // "0G01",
      "0G01",
      // "0G02",
      "0G02",
    ];
    this.discard = [];
    this.actionPoints = 2;
    this.autoIncrement = 0;
    this.isFirstPlayer = isFirstPlayer;
  }

  setupDeck() {
    let deckCards = [];
    this.deck.forEach((val) => {
      const cardModel = CardList.get(val);
      const card = new cardModel({
        playerID: this.playerID,
        id: this.autoIncrement++,
      });
      deckCards.push(card);
    });
    this.deck = deckCards;
  }

  shuffle() {
    //Fisher–Yates shuffle
    for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(uniformFloat() * (i + 1));
      var temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }

  draw(controller) {
    const card = this.deck.shift();
    this.hand.push(card);
    const effect = new CardDrawnEffect(this.playerID, card, this.deck.length);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  discardCard(controller, id) {
    const card = this.hand.find((val) => val.id == id);
    if (!card) {
      return;
    }
    this.discard.push(card);
    this.hand = this.hand.filter((val) => val.id != card.id);
    const effect = new CardDiscardedEffect(
      this.playerID,
      card,
      this.discard.length,
    );
    controller.eventEmitter.emit("sim:effect", effect);
  }

  shuffleCardIntoDeck(controller, card) {
    this.deck.push(card);
    this.shuffle();
    const effect = new CardShuffledBackIntoDeckEffect(
      this.playerID,
      card,
      this.deck.length,
    );
    controller.eventEmitter.emit("sim:effect", effect);
  }

  useAction() {
    this.actionPoints -= 1;
    const effect = new PlayerActionsCountEffect(
      this.playerID,
      this.actionPoints,
    );
  }

  refillActions() {
    this.actionPoints == 2;
    const effect = new PlayerActionsCountEffect(
      this.playerID,
      this.actionPoints,
    );
  }

  getCardInHand(cardID) {
    return this.hand.find((card) => card.id === cardID);
  }
}

export default PlayerModel;
