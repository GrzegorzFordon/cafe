import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitAlice extends UnitCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0U01";
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
    this.unitATK = 2;
    this.unitHP = 3;
    this.speed = 3;
  }

  onPlay(controller, options) {
    // super(controller,options)
    super.onPlay(controller, options);
    controller.unitController.spawnUnit(this.playerID, 1, options.hex, {
      atk: this.unitATK,
      hp: this.unitHP,
      speed: this.speed,
    });
  }
}
export default UnitAlice;
