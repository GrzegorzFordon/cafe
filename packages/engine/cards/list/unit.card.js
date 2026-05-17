import CardModel from "../card.model.js";

class UnitCardModel extends CardModel {
  constructor(options) {
    super(options);
    this.name = options.name ?? "Unit";
    this.atk = options.atk ?? 0;
    this.HP = options.HP ?? 0;
    this.speed = options.speed ?? 0;
  }

  onPlay(controller, options) {
    super.onPlay(controller, options);
    controller.unitController.spawnUnit(
      this.playerID,
      this.cardID,
      options.hex,
      {
        atk: this.unitATK,
        HP: this.unitHP,
        speed: this.speed,
      },
    );
  }
}

export default UnitCardModel;
