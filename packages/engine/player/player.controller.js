/**
 * player info, state, actions
player is the avatar in the game, but not the client!
see client for actually dispatching input events.
 */

import Controller from "../controller.js";
import PlayerModel from "./player.model.js";

class PlayerController extends Controller {
  constructor() {
    super();

    this.id = "id";
    this.model = new PlayerModel(); // ??
  }

  init(options) {
    //TODO set actual model
    this.model = new PlayerModel(options);
  }

  //actions - engine stuff, have that player draw a card, stuff like that

  draw(amount) {
    //draw card
  }
  discard(cardID) {
    //discard card
  }

  playCard(cardID, options) {
    //play card
    //how does this play with card controller? maybe it calls it here?
  }
  burnCard(cardID, options) {
    //burn card
  }
}

export default PlayerController;

// validateDeck(deck) { }
// serialize() {
//   //TODO turn all needed info into a playerDTO (schemas)
// }
