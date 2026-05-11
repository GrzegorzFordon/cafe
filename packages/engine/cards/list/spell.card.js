import CardModel from "../card.model.js";


class SpellCardModel extends CardModel {
  constructor(options) {
    super(options);
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}

export default SpellCardModel;
