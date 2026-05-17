// import * as z from "zod";

import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import CardModel from "../cards/card.model.js";
import CardDrawnEffect from "../effect/effects/cardDrawn.effect.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import { CardList } from "../cards/cardList.js";
import PlayerActionsCountEffect from "../effect/effects/playerActionsCount.effect.js";
import uniformFloat from "../util/prng.js";
import { BURN_TYPES } from "../config.js";

class PlayerModel {
  constructor(options, playerID) {
    this.playerID = playerID;
    this.hand = [];
    this.deck = [
      "0U01",
      "0U01",
      "0U01",
      "0U02",
      "0U02",
      "0U02",
      "0U02",
      "0U02",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0U01",
      "0U01",
      "0U01",
      "0U02",
      "0U02",
      "0U02",
      "0U02",
      "0U02",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
      "0S01",
    ];
    this.discard = [];
    this.actionPoints = 2;
    this.autoIncrement = 0;
    // this.activeBurnEffects = [];
  }

  shuffle() {
    //Fisher–Yates shuffle
    // let index = this.deck.length;
    // while (index != 0) {
    //   let rndIndex = Math.floor(uniformFloat * index);
    //   console.log(uniformFloat);
    //   index--;
    //   [this.deck[index], this.deck[rndIndex]] = [
    //     this.deck[rndIndex],
    //     this.deck[index],
    //   ];
    // }

    for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(uniformFloat() * (i + 1));
      var temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }

  draw(controller) {
    const cardID = this.deck.shift();
    if (!cardID) {
      // console.log("Add Player Lost Game Here");
      return;
    }
    const cardModel = CardList.get(cardID);
    const card = new cardModel({
      playerID: this.playerID,
      id: this.autoIncrement++,
    });
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
    const effect = new CardDiscardedEffect(
      this.playerID,
      card,
      this.discard.length,
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
    // console.log("Player Model", this.playerID, this.hand);
    return this.hand.find((card) => card.id === cardID);
  }

  getHeldBurnTypes() {
    const holdingPower = this.hand.some(
      (card) => card.burnEffects.includes[BURN_TYPES.POWER],
    );
    const holdingSpeed = this.hand.some(
      (card) => card.burnEffects.includes[BURN_TYPES.SPEED],
    );
    const holdingMove = this.hand.some(
      (card) => card.burnEffects.includes[BURN_TYPES.MOVE],
    );

    return { power: holdingPower, speed: holdingSpeed, move: holdingMove };
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
