import Effect from "../effect.js";

class CardBurnedEffect extends Effect {
  name = "Card Burned Effect";
  constructor(playerID, card) {
    super();
    this.playerID = playerID;
    this.card = card;
  }
}
export default CardBurnedEffect;
