import { BURN_TYPES } from "../../../config.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitPulp extends UnitCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0U02";
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
    this.burnEffects = [BURN_TYPES.POWER];

    this.name = "Pulp";
    this.unitATK = 1;
    this.unitHP = 1;
    this.speed = 5;
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UnitPulp;
