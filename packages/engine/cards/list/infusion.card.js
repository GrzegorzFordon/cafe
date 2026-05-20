import CardModel from "../card.model.js";

class InfusionCardModel extends CardModel {
  constructor(options) {
    super(options);
  }

  onBurn(controller, options) {
    super.onBurn(controller, options);
  }
}

export default InfusionCardModel;
