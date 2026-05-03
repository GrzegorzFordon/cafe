import Action from "../action.model";

class PlayAction extends Action {
  constructor(card, target) {
    super();
    this.card = card;
    this.target = target;
  }

  name = "Play";

  execute(controller) {
    //get unit, move it
  }
}
export default PlayAction;
