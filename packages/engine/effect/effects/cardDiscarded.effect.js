import Effect from "../effect.js";

class CardDiscardedEffect extends Effect {
  name = "Card Discarded Effect";
  constructor(playerID, card) {
    super();
    this.playerID = playerID;
    this.card = card;
  }
}
export default CardDiscardedEffect;
