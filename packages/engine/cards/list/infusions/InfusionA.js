import { BURN_TYPES } from "../../../config.js";
import ShuffleBackAbility from "../../abilities/shuffleBack.ability.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import InfusionCardModel from "../infusion.card.js";

class InfusionA extends InfusionCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0I01";
    this.burnEffects = [BURN_TYPES.SPEED, BURN_TYPES.MOVE];
    this.name = "Green Tea";
    this.uses = options.uses ?? 0;
  }

  //TODO - prevent from being discarded
  onBurn(controller, options) {
    if (this.uses < 1) {
      this.onBurnAbilities = [];
      const shuffleBackAbility = new ShuffleBackAbility(
        this.playerID,
        new InfusionA({ uses: 1 }),
      );
      this.onBurnAbilities.push(shuffleBackAbility);
    }
    super.onBurn(controller, options);
  }
}
export default InfusionA;
