/**
 * player info, state, actions
player is the avatar in the game, but not the client!
 */

import { BASE_HAND_SIZE } from "../config.js";
import Controller from "../controller.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import PlayerModel from "./player.model.js";

class PlayerController extends Controller {
  constructor() {
    super();
    this.id = "id";
    this.model = new PlayerModel();
  }

  init(options) {
    //TODO set actual model
    this.model = new PlayerModel(options);
    this.model.shuffle();
    this.draw(BASE_HAND_SIZE);
  }

  draw(amount) {
    for (let n = 0; n < amount; n++) this.model.draw();
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
