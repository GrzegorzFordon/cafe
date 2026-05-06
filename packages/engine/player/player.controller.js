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
    this.models = new Map();
  }

  init(options) {
    this.models.set(options?.playerOneID ?? 1, new PlayerModel(options, 1));
    this.models.set(options?.playerTwoID ?? 2, new PlayerModel(options, 2));
    this.models.forEach((m) => m.shuffle());
    this.drawUpToHandSize();
  }

  drawUpToHandSize() {
    /**
     * Have players draw up to hand size OR burn the top card
     * if their hand is full (to force deckout)
     **/

    this.models.forEach((m) => {
      while (m.hand.length < BASE_HAND_SIZE) m.draw();
    });
  }

  draw(playerID, amount) {
    const model = this.models.get(playerID);
    for (let n = 0; n < amount; n++) model.draw();
  }

  discardCard(playerID, cardID) {
    const model = this.models.get(playerID);
    model.discardCard(cardID);
  }

  // checkForEnemyHoldingBase(){
  //   const baseHex = BASE_COORDS //change to be different for players
  //   const unitInBase =
  // }

  // playCard(cardID, options) {
  //   //play card
  //   //how does this play with card controller? maybe it calls it here?
  //   this.discard(cardID);
  // }

  // burnCard(cardID, options) {
  //   //burn card
  // }

  get players() {
    return this.models;
  }
}

export default PlayerController;

// validateDeck(deck) { }
// serialize() {
//   //TODO turn all needed info into a playerDTO (schemas)
// }
