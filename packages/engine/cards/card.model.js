import CardResolvingEffect from "../effect/effects/cardResolving.effect.js";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import { BURN_TYPES, SPELL_TARGET_TYPES, TARGET_OPTIONS } from "../config.js";
import CardBurnedEffect from "../effect/effects/cardBurned.effect.js";

class CardModel {
  constructor(options) {
    this.id = options.id;
    this.playerID = options.playerID;
    this.burnEffects = [];
    this.speed = 0;
    this.playable = true;
    this.resolveSpeed = options.resolveSpeed ?? this.speed;
    this.abilities = [];
    this.onBurnAbilities = [];
    this.targetType = SPELL_TARGET_TYPES.NONE;
    this.targetOptions = options.targetOptions ?? [];
    this.cardText = "";
  }

  onPlay(controller, options) {
    const effect = new CardResolvingEffect(this.playerID, this);
    controller.eventEmitter.emit("sim:effect", effect);
    this.abilities?.forEach((a) => a.resolve(controller, options));
  }

  onBurn(controller, options) {
    const effect = new CardBurnedEffect(this.playerID, this);
    controller.eventEmitter.emit("sim:effect", effect);
    this.onBurnAbilities?.forEach((a) => a.resolve(controller, options));
  }
}

export default CardModel;
