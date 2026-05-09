import Controller from "../controller.js";

class CardController extends Controller {
  constructor(game) {
    super(game);
    // this.model = new Card();
  }

  init() {}

  resolveCard(playerID, card, options) {
    // console.log(this.game);
    // console.log("[Card Controller] Resolving", card, "with", options);
    card.onPlay(this.game, options);
  }
}
export default CardController;
