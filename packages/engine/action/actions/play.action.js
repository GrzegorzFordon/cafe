import Action from "../action.model";

class PlayAction extends Action {
  // constructor(card, hex) {
  constructor(card, target) {
    super();
    this.card = card;
    // this.hex = hex;
    this.target = target;
    this.name = "PLAY";
  }
}

export default PlayAction;
