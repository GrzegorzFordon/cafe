import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitAlice extends UnitCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0U01";
    this.name = "Alice";
    this.unitATK = 2;
    this.unitHP = 3;
    this.speed = 3;
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UnitAlice;
