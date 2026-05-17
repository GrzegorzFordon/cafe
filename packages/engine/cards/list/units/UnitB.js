import { BURN_TYPES } from "../../../config.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitB extends UnitCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0U03";
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
    this.burnEffects = [BURN_TYPES.MOVE];

    this.name = "Unit B";
    this.unitATK = 1;
    this.unitHP = 3;
    this.speed = 2;
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UnitB;
