import { nanoid } from "nanoid";
import CardResolvingEffect from "../effect/effects/cardResolving.effect.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";

class CardModel {
  constructor(options) {
    this.id = nanoid();
    this.playerID = options.playerID;

    // this.schema = options.schema;
    this.cardID = options.cardID ?? "0000"; //TODO move to schema
  }

  onPlay(controller, options) {
    // console.log("Playing", this);
    const effect = new CardResolvingEffect(this.playerID, this);
    eventEmitter.emit("sim:effect", effect);
  }
}

export default CardModel;
