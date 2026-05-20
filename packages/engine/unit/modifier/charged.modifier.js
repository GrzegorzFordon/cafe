import ModifierModel from "./modifier.model.js";

class ChargedModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Charged";
  }
}

export default ChargedModifier;
