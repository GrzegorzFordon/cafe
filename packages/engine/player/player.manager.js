/**
 * player info, state, actions
player is the avatar in the game, but not the client!
see client for actually dispatching input events.
 */

class PlayerManager {
  constructor() {
    this.id = "id";
    this.heroID = "heroID";
    this.deck = ["cardID_01", "cardID_02"];
    this.hand = [];
    this.discard = [];
    this.units = [];
  }

  //hand, deck, pawns
  //state

  serialize() {
    //TODO turn all needed info into a playerDTO (schemas)
  }

  //actions - engine stuff, have that player draw a card, stuff like that
  draw(amount) {}
  discard(cardID) {}

  playCard(cardID,options){}



  validateDeck(deck) {} //??
}

export default PlayerManager;
