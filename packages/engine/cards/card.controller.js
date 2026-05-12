import Controller from "../controller.js";

class CardController extends Controller {
  constructor(game) {
    super(game);
    // this.model = new Card();
  }

  init() {}

  resolveCard(playerID, cardID, options) {
    // console.log(this.game.playerController.playerModels.get(playerID), cardID);
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    // console.log("[Card Controller] Resolving", card.name, "with", options);
    card.onPlay(this.game, options);
  }
}
export default CardController;
