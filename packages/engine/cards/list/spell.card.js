import CardModel from "../card.model.js";

class SpellCardModel extends CardModel {
  constructor(options) {
    super(options);
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
    //TODO - resolve ability list
  }
}

export default SpellCardModel;
