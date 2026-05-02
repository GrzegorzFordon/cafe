import Effect from "../effect";

class CardDrawnEffect extends Effect {
  name = "Card Drawn Effect";
  constructor(card) {
    super();
    this.card = card;
  }
}
export default CardDrawnEffect;
