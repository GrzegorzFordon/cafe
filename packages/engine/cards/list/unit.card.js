import SpawnUnitAbility from "../abilities/spawnUnit.ability.js";
import CardModel from "../card.model.js";

class UnitCardModel extends CardModel {
  constructor(options, unitData) {
    super(options);
    this.name = options.name ?? "Unit";
    this.atk = unitData.atk ?? 0;
    this.hp = unitData.hp ?? 0;
    this.speed = unitData.speed ?? 0;
    this.reach = unitData.reach ?? 0;
  }

  onPlay(controller, options) {
    const unitData = {
      atk: this.atk,
      hp: this.hp,
      speed: this.speed,
      reach: this.reach,
    };

    const spawnAbility = new SpawnUnitAbility({
      playerID: this.playerID,
      cardID: this.cardID,
      hex: options.hex,
      unitData,
    });

    this.abilities.push(spawnAbility);
    super.onPlay(controller, options);
  }
}

export default UnitCardModel;
