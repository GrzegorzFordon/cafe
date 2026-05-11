import Effect from "../effect.js";

class CardDrawnEffect extends Effect {
  name = "Card Drawn Effect";
  constructor(playerID, card, cardsInDeckAmount) {
    super();
    this.playerID = playerID;
    this.card = card;
    this.cardsInDeckAmount = cardsInDeckAmount;
  }
}
export default CardDrawnEffect;
