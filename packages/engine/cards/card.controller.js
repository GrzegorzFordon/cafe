import Controller from "../controller.js";

class CardController extends Controller {
  constructor(game) {
    super(game);
  }

  init() {}

  resolveCard(playerID, cardID, options) {
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    card.onPlay(this.game, options);
  }

  burnCard(playerID, cardID) {
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    card.onBurn(this.game, card);
  }
}
export default CardController;
