import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitBeta extends UnitCardModel {
  constructor(options) {
    super(options, { atk: 2, hp: 1, speed: 6, reach: 1 });
    this.cardID = "0U03";
    this.name = "Unit Beta";
    this.cardText = "2ATK | 1HP";
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}
export default UnitBeta;
