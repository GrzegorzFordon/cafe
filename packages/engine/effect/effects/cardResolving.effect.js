import Effect from "../effect.js";

class CardResolvingEffect extends Effect {
  name = "Card Resolving Effect";
  constructor(playerID, card) {
    super();
    this.playerID = playerID;
    this.card = card;
  }
}
export default CardResolvingEffect;
