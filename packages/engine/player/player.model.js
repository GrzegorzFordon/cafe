// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import { CardList } from "../cards/cardList.js";
import PlayerActionsCountEffect from "../effect/effects/playerActionsCount.effect.js";

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
      // "0U02",
      // "0U03",
      // "0U04",
      // "0U05",
      // "0U06",
      // "0U07",
      // "0U08",
      // "0U09",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
    ];
    this.discard = [];
    this.actionPoints = 2;
    // this.activeBurnEffects = [];
  }

  shuffle() {
    // //Fisher–Yates shuffle
    // let index = this.deck.length;
    // while (index != 0) {
    //   let rndIndex = Math.floor(Math.random() * index);
    //   index--;
    //   [this.deck[index], this.deck[rndIndex]] = [
    //     this.deck[rndIndex],
    //     this.deck[index],
    //   ];
    // }
  }

  draw(controller) {
    const cardID = this.deck.shift();
    if (!cardID) {
      // console.log("Add Player Lost Game Here");
      return;
    }
    const cardModel = CardList.get(cardID);
    const card = new cardModel({ playerID: this.playerID });
    this.hand.push(card);
    const effect = new CardDrawnEffect(this.playerID, card, this.deck.length);
    controller.eventEmitter.emit("sim:effect", effect);
  }

  discardCard(controller, id) {
    const card = this.hand.find((val) => val.id == id);
    if (!card) {
      console.log("CARD NOT FOUND");
      return;
    }
    this.discard.push(card);
    this.hand = this.hand.filter((val) => val.id != card.id);
    const effect = new CardDiscardedEffect(this.playerID, card);
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
    // console.log("Player Model", this.playerID, this.hand);
    return this.hand.find((card) => card.id === cardID);
  }

  // //Burn Effects
  // addBurnEffect(effect) {
  //   this.activeBurnEffects.push(effect);
  // }

  // get burnEffects() {
  //   return this.activeBurnEffects;
  // }

  // useBurnEffect(type) {
  //   const index = this.activeBurnEffects.find(type);
  //   if (!index) return false;
  //   this.activeBurnEffects.splice(index, 1);
  //   return true;
  // }
}

export default PlayerModel;
