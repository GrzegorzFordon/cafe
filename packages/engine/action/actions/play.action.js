import Action from "../action.model";

class PlayAction extends Action {
  constructor(card, hex) {
    super();
    this.card = card;
    this.hex = hex;
    this.name = "PLAY";
  }

  // execute(controller) {
  //   super.execute(controller);
  //   controller.playerController.discardCard(this.playerID, this.card.id);
  //   const options = { hex: this.hex };
  //   controller.cardController.resolveCard(this.playerID, this.card, options);
  // }
}

export default PlayAction;
