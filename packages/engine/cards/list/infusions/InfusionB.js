import { BURN_TYPES } from "../../../config.js";
import ShuffleBackAbility from "../../abilities/shuffleBack.ability.js";
import CardModel from "../../card.model.js";
import InfusionCardModel from "../infusion.card.js";

class InfusionB extends InfusionCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0I02";
    this.burnEffects = [BURN_TYPES.POWER, BURN_TYPES.POWER];
    this.name = "Double Espresso";
    this.uses = options.uses ?? 0;
  }

  //TODO - prevent from being discarded
  onBurn(controller, options) {
    if (this.uses < 1) {
      this.onBurnAbilities = [];
      const shuffleBackAbility = new ShuffleBackAbility(
        this.playerID,
        new InfusionB({ id: this.id, playerID: this.playerID, uses: 1 }),
      );
      this.onBurnAbilities.push(shuffleBackAbility);
    }
    super.onBurn(controller, options);
  }
}
export default InfusionB;
