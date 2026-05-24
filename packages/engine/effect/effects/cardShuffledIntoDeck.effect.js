import Effect from "../effect.js";

class CardShuffledBackIntoDeckEffect extends Effect {
  name = "Card Shuffled Back Into Deck Effect";
  constructor(playerID, card, cardsInDeckAmount) {
    super();
    this.playerID = playerID;
    this.card = card;
    this.cardsInDeckAmount = cardsInDeckAmount;
  }
}
export default CardShuffledBackIntoDeckEffect;
