/**
 * player info, state, actions
player is the avatar in the game, but not the client!
 */
import { BASE_HAND_SIZE } from "../config.js";
import Controller from "../controller.js";
import CardDiscardedEffect from "../effect/effects/cardDiscarded.effect.js";
import PlayerModel from "./player.model.js";

class PlayerController extends Controller {
  constructor(game) {
    super(game);
    this.id = "id";
    this.game = game;
    this.playerModels = new Map();
  }

  init(options) {
    this.game.options.players.forEach((player) =>
      this.playerModels.set(
        player.id ?? 0,
        new PlayerModel(options, player.id ?? 0), //TODO second argument needs .id
      ),
    );

    this.playerModels.forEach((m) => {
      m.setupDeck();
      m.shuffle();
    });
    this.drawUpToHandSize();
  }

  drawUpToHandSize() {
    /**
     * Have players draw up to hand size OR burn the top card
     * if their hand is full (to force deckout)
     **/

    this.playerModels.forEach((m) => {
      while (m.hand.length < BASE_HAND_SIZE) {
        if (!m.deck.length) break;
        m.draw(this.game);
      }
    });
  }

  draw(playerID, amount) {
    const playerModel = this.playerModels.get(playerID);
    for (let n = 0; n < amount; n++) playerModel.draw(this.game);
  }

  discardCard(playerID, cardID) {
    const playerModel = this.playerModels.get(playerID);
    playerModel.discardCard(this.game, cardID);
  }

  shuffleCardIntoDeck(playerID, card) {
    const playerModel = this.playerModels.get(playerID);
    if (!playerModel) return;
    playerModel.shuffleCardIntoDeck(this.game, card);
  }

  getCardInHand(playerID, cardID) {
    const playerModel = this.playerModels.get(playerID);
    if (!playerModel) return;
    const card = playerModel.getCardInHand(cardID);
    if (!card) return;
    return card;
  }

  getHeldBurnTypes(playerID) {
    const model = this.playerModels.get(playerID);
    if (!model) return;
    const res = model.getHeldBurnTypes();
    if (!res) return;
    return res;
  }
}

export default PlayerController;

// validateDeck(deck) { }
// serialize() {
//   //TODO turn all needed info into a playerDTO (schemas)
// }
// checkForEnemyHoldingBase(){
//   const baseHex = BASE_COORDS //change to be different for players
//   const unitInBase =
// }
