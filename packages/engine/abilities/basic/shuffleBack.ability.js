import Ability from "../ability.js";
import CardShuffledBackIntoDeckEffect from "../../effect/effects/cardShuffledIntoDeck.effect.js";

class ShuffleBackAbility extends Ability {
  constructor(playerID, card) {
    super(playerID);
    this.card = card;
  }

  resolve(controller) {
    controller.playerController.shuffleCardIntoDeck(this.playerID, this.card);
  }
}
export default ShuffleBackAbility;
