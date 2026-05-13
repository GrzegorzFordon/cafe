import Effect from "../effect.js";

class CardDiscardedEffect extends Effect {
  name = "Card Discarded Effect";
  constructor(playerID, card, cardsInDiscardAmount) {
    super();
    this.playerID = playerID;
    this.card = card;
    this.cardsInDiscardAmount = cardsInDiscardAmount;
  }
}
export default CardDiscardedEffect;
