import { BURN_TYPES } from "../../../config.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import InfusionCardModel from "../infusion.card.js";

class InfusionA extends InfusionCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0I01";
    this.burnEffects = [BURN_TYPES.SPEED, BURN_TYPES.MOVE];
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
    this.name = "Green Tea";
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }

  onBurn(controller, options) {
    super.onBurn(controller, options);
    //TODO - Infusion effect goes here, also call this method
  }
}
export default InfusionA;
