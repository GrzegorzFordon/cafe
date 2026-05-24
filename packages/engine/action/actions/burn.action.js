import Action from "../action.model";

class BurnAction extends Action {
  constructor(card) {
    super();
    this.card = card;
    this.name = "BURN";
  }
}
export default BurnAction;
