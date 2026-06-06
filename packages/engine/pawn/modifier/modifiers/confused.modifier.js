import ModifierModel from "../modifier.model.js";

class ConfusedModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Confused";
  }
}

export default ConfusedModifier;
