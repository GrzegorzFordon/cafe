import SpawnUnitAbility from "../../abilities/spawnUnit.ability";
import CardModel from "../../card.model";
import SpellCardModel from "../spell.card";

class SpellZap extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S01";
    this.name = "zZzap!!";
    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
    console.log("zzzZzZZAppin!");
  }
}
export default SpellZap;
