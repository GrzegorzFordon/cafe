import Effect from "../effect.js";

class CardDrawnEffect extends Effect {
  name = "Card Drawn Effect";
  constructor(card) {
    super();
    this.card = card;
  }
}
export default CardDrawnEffect;
