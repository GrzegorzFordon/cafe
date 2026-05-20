import ModifierModel from "./modifier.model.js";

class ExhaustedModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Exhausted";
  }
}

export default ExhaustedModifier;
