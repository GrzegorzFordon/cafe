import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import UnitCardModel from "../unit.card.js";

class S1L1 extends UnitCardModel {
  constructor(options) {
    super(options, { atk: 3, hp: 4, speed: 2, reach: 1 });
    this.cardID = "0L01";
    this.name = "S1L1";
    this.cardText = "Leader A Squad A";
  }

  onPlay(controller, target) {
    super.onPlay(controller, target);
  }
}
export default S1L1;
