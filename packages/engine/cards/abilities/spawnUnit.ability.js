import Ability from "./ability.js";

class SpawnUnitAbility extends Ability {
  constructor(options) {
    super(options);
    // this.playerID = options.playerID;
    // this.unit = options.unit;
    // this.hex = options.hex;
  }

  resolve(controller, playerID, unit, hex) {
    controller.unitController.spawnUnit(playerID, unit.unitID, hex);
  }
}
export default SpawnUnitAbility;
