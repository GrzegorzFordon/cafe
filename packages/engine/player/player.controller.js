/**
 * player info, state, actions
player is the avatar in the game, but not the client!
 */

import { BASE_HAND_SIZE } from "../config.js";
import Controller from "../controller.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import PlayerModel from "./player.model.js";

class PlayerController extends Controller {
  constructor(options) {
    super();
    this.id = "id";
    this.models = [new PlayerModel(), new PlayerModel()]; //TODO change to map (id,playermodel)
    this.modelsM = new Map();
  }

  init(options) {
    // this.models = [new PlayerModel(options), new PlayerModel(options)];
    // this.modelsM = {{options.playerOneID:new PlayerModel(options)}};
    this.modelsM.set(options?.playerOneID ?? 1, new PlayerModel(options,1));
    this.modelsM.set(options?.playerTwoID ?? 2, new PlayerModel(options,2));
    this.modelsM.forEach((m) => m.shuffle());
    this.drawUpToHandSize();
  }

  draw(amount) {
    for (let n = 0; n < amount; n++) this.modelsM.forEach((m) => m.shuffle());
  }

  drawUpToHandSize() {
    this.modelsM.forEach((m) => {
      while (m.hand.length < BASE_HAND_SIZE) m.draw();
    });
  }

  discardCard(cardID) {
    this.model.discardCard(cardID);
  }

  // playCard(cardID, options) {
  //   //play card
  //   //how does this play with card controller? maybe it calls it here?
  //   this.discard(cardID);
  // }

  // burnCard(cardID, options) {
  //   //burn card
  // }
}

export default PlayerController;

// validateDeck(deck) { }
// serialize() {
//   //TODO turn all needed info into a playerDTO (schemas)
// }
