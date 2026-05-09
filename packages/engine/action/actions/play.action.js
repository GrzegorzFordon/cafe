import Action from "../action.model";

class PlayAction extends Action {
  constructor(card, hex) {
    super();
    this.card = card;
    this.hex = hex;
  }

  name = "Play";

  execute(controller) {
    controller.playerController.discardCard(this.playerID, this.card.id);
    const options = { hex: this.hex };
    controller.cardController.resolveCard(this.playerID, this.card, options);
    // this.card.play(controller);
  }
}
export default PlayAction;
