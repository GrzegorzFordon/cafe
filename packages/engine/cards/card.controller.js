import Controller from "../controller.js";

class CardController extends Controller {
  constructor(game) {
    super(game);
    // this.model = new Card();
  }

  init() {}

  resolveCard(playerID, cardID, options) {
    // const player = this.game.playerController.playerModels.get(playerID);
    // let ids = [];
    // player.hand.forEach((card) => ids.push(card.id));
    // console.log(ids, cardID);
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    // console.log("[Card Controller] Resolving", card.name, "with", options);
    card.onPlay(this.game, options);
  }

  burnCard(playerID, cardID, options) {
    const card = this.game.playerController.getCardInHand(playerID, cardID);
    card.onBurn(this.game, options);
  }
}
export default CardController;
