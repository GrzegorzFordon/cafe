import CardModel from "../card.model.js";

class InfusionCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.playable = false;
    this.speed = 0;
  }

  // onBurn(controller, options) {
  //   super.onBurn(controller, options);
  // }
}

export default InfusionCardModel;
