import Action from "../action.model";

class PlayAction extends Action {
  constructor(card, target) {
    super();
    this.card = card;
    this.target = target;
    this.name = "PLAY";
  }
}

export default PlayAction;
