import { BURN_TYPES } from "../../../config.js";
import SpawnUnitAbility from "../../abilities/spawnUnit.ability.js";
import CardModel from "../../card.model.js";
import SpellCardModel from "../spell.card.js";

class SpellZap extends SpellCardModel {
  constructor(options) {
    super(options);
    this.cardID = "0S01";
    this.name = "zZzap!!";
    this.speed = 5;
    this.burnEffects = BURN_TYPES.POWER;

    // this.abilities = [new SpawnUnitAbility({ playerID: this.playerID, unit:this })];
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
    // console.log("zzzZzZZAppin!");
  }
}
export default SpellZap;
