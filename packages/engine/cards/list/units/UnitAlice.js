import SpawnUnitAbility from "../../abilities/spawnUnit.ability";
import CardModel from "../../card.model";
import UnitCardModel from "../unit.card";

class UnitAlice extends UnitCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0U01";
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
  }

  onPlay(controller, options) {
    // super(controller,options)
    super.onPlay(controller, options);
    controller.unitController.spawnUnit(this.playerID, 1, options.hex);
  }
}
export default UnitAlice;
