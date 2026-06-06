import Action from "../action.model";

class AbilityAction extends Action {
  constructor(pawn, abilityID, target) {
    super();
    this.pawn = pawn;
    this.target = target;
    this.abilityID = abilityID;
    this.name = "ABILITY";
  }
}

export default AbilityAction;
