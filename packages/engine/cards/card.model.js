import CardResolvingEffect from "../effect/effects/cardResolving.effect.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { BURN_TYPES } from "../config.js";

class CardModel {
  constructor(options) {
    this.id = options.id;
    this.playerID = options.playerID;
    this.burnEffects = [];
    // this.schema = options.schema;
    this.cardID = options.cardID ?? "0000"; //TODO move to schema
    this.name = options.name ?? "Card";
    this.speed = options.speed ?? 0;
    this.resolveSpeed = options.resolveSpeed ?? this.speed;
    this.abilities = [];
  }

  onPlay(controller, options) {
    // console.log("[Card Model] Playing", this.name, "with", options);
    const effect = new CardResolvingEffect(this.playerID, this);
    controller.eventEmitter.emit("sim:effect", effect);
    this.abilities.forEach((a) => a.resolve(controller));
    // this.burnEffects.forEach((val) =>
    //   controller.playerController.discardCard(this.playerID, val.id),
    // );
  }

  onBurn(controller, options) {}
}

export default CardModel;
