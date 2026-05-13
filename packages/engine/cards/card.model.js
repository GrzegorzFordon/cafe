// import { nanoid } from "nanoid";
import CardResolvingEffect from "../effect/effects/cardResolving.effect.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { BURN_TYPES } from "../config.js";
// import { incrementCounter } from "../util/refCount.js";
class CardModel {
  constructor(options) {
    // this.id = nanoid();
    // this.id = incrementCounter();
    this.id = options.id;
    this.playerID = options.playerID;
    this.burnEffects = BURN_TYPES.MOVE;

    // this.schema = options.schema;
    this.cardID = options.cardID ?? "0000"; //TODO move to schema
    this.speed = options.speed ?? Math.round(Math.random() * 10);
  }

  onPlay(controller, options) {
    // console.log("[Card Model] Playing", this.name, "with", options);
    const effect = new CardResolvingEffect(this.playerID, this);
    controller.eventEmitter.emit("sim:effect", effect);
    // this.burnEffects.forEach((val) =>
    //   controller.playerController.discardCard(this.playerID, val.id),
    // );
  }
}

export default CardModel;
