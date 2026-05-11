import Action from "../action.model";

class BurnAction extends Action {
  constructor(card) {
    super();
    this.card = card;
  }

  name = "Burn";

  // execute(controller) {
  //   controller.playerController.discardCard(this.playerID, this.card.id);
  // }
}
export default BurnAction;
