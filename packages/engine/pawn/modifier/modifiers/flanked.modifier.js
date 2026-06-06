import ModifierModel from "../modifier.model.js";

class FlankedModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Flanked";
  }
}

export default FlankedModifier;
