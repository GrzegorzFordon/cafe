import Effect from "../effect.js";

class CardDrawnEffect extends Effect {
  name = "Card Drawn Effect";
  constructor(playerID, card) {
    super();
    this.playerID = playerID;
    this.card = card;
  }
}
export default CardDrawnEffect;
