import Controller from "../controller.js";
import _ from "lodash";
import { BURN_TYPES } from "../config.js";
class ActionController extends Controller {
  constructor(game) {
    super(game);
  }

  init() {}

  async resolveActions(actions) {
    actions = this.sortActionsBySpeed(actions);

    _.defer(() => {
      while (actions.length > 0) {
        const nextAction = actions.shift();
        this.resolveAction(nextAction);
      }
    });
  }

  async resolveAction(action) {
    action.bonuses.forEach((val) => {
      this.game.cardController.burnCard(action.playerID, val.id);
      this.game.playerController.discardCard(action.playerID, val.id);
    });

    if (action.name === "PLAY") this.resolvePlayAction(action);
    if (action.name === "MOVE") this.resolveMoveAction(action);
  }

  async resolvePlayAction(action) {
    // const options = { hex: action.target.object };

    //TODO - Validate action first

    await this.game.cardController.resolveCard(
      action.playerID,
      action.card.id,
      // options,
      action.target,
    );
    this.game.playerController.discardCard(action.playerID, action.card.id);
  }

  async resolveMoveAction(action) {
    //TODO - Validate action first
    this.game.boardController.resolveMove(
      action.unit,
      action.target,
      action.bonuses,
    );
  }



  sortActionsBySpeed(actions) {
    return actions.sort((a, b) => {
      const aSpeedBase = a?.card?.speed ? a.card.speed : a.unit.speed;
      const bSpeedBase = b?.card?.speed ? b.card.speed : b.unit.speed;
      let aSpeedBonus = 0;
      a.bonuses.forEach(
        (val) =>
          (aSpeedBonus += val.burnEffects.filter(
            (val) => val == BURN_TYPES.SPEED,
          ).length),
      );
      let bSpeedBonus = 0;
      b.bonuses.forEach(
        (val) =>
          (bSpeedBonus += val.burnEffects.filter(
            (val) => val == BURN_TYPES.SPEED,
          ).length),
      );
      return bSpeedBase + bSpeedBonus - (aSpeedBase + aSpeedBonus);
    });
  }
}

export default ActionController;
