import CardModel from "../card.model";

class SpellCardModel extends CardModel {
  constructor(options) {
    super(options);
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
  }
}

export default SpellCardModel;
