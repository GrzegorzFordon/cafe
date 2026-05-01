/**
 * player info, state, actions
player is the avatar in the game, but not the client!
see client for actually dispatching input events.
 */

import PlayerModel from "./player.model.js";

class PlayerController extends Controller {
  constructor() {
    this.id = "id";
    this.model = new PlayerModel(); // ??
  }

  init(options) {
    //TODO set actual model
  }

  serialize() {
    //TODO turn all needed info into a playerDTO (schemas)
  }

  //actions - engine stuff, have that player draw a card, stuff like that
  draw(amount) {
    //draw card
  }
  discard(cardID) {
    //discard card
  }

  playCard(cardID, options) {
    //play card! how does this play with card controller? maybe it calls it here?
  }

  // validateDeck(deck) { }
}

export default PlayerController;
