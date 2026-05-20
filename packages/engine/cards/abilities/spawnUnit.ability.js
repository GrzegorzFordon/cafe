import Ability from "./ability.js";

class SpawnUnitAbility extends Ability {
  constructor(options) {
    super(options);
    // this.controller = options.controller;
    this.playerID = options.playerID;
    this.cardID = options.cardID;
    this.hex = options.hex;
    this.unitData = options.unitData;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.spawnUnit(
      this.playerID,
      this.cardID,
      this.hex,
      this.unitData,
    );
  }
}
export default SpawnUnitAbility;
