import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class UnitAlice extends UnitCardModel {
  constructor(options) {
    super(options, { atk: 2, hp: 3, speed: 4, reach: 1 });
    this.cardID = "0U01";
    this.name = "Alice";
    this.cardText = "2ATK | 3HP";
  }

  onPlay(controller, target) {
    super.onPlay(controller, target);
  }
}
export default UnitAlice;
