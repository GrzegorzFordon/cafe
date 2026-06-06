import ModifierModel from "../modifier.model.js";

class TauntedModifier extends ModifierModel {
  constructor(options) {
    super(options);
    this.name = "Taunted";
  }
}

export default TauntedModifier;
