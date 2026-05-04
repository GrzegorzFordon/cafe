import Effect from "../effect.js";

class CardDiscardedEffect extends Effect {
  name = "Card Discarded Effect";
  constructor(card) {
    super();
    this.card = card;
  }
}
export default CardDiscardedEffect;
