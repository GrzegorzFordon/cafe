import Effect from "../effect.js";

class CombatStartedEffect extends Effect {
  name = "Combat Started Effect";
  constructor(attackerUnitID, defenderUnitID) {
    super();
    this.attackerUnitID = attackerUnitID;
    this.defenderUnitID = defenderUnitID;
  }
}
export default CombatStartedEffect;
