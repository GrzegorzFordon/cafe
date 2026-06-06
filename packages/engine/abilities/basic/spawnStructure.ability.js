import Ability from "../ability.js";

class SpawnUnitAbility extends Ability {
  constructor(options) {
    super(options);
    this.playerID = options.playerID;
    this.cardID = options.cardID;
    this.hex = options.hex;
    this.structureData = options.structureData;
  }

  resolve(controller) {
    super.resolve(controller);
    controller.unitController.spawnUnit(
      this.playerID,
      this.cardID,
      this.hex,
      this.structureData,
    );
  }
}
export default SpawnUnitAbility;
