import CardModel from "../card.model";

class UnitCardModel extends CardModel {
  constructor(options) {
    super(options);
    // this.unitID; //or unit object?
  }

  play(controller, options) {
    controller.unitController.spawnUnit(this.playerID, 1, options.hex);
  }
}

export default UnitCardModel;
