/**
 * general card entity
 */
import { nanoid } from "nanoid";

class CardModel {
  constructor(options) {
    this.id = nanoid();
    this.cardID = options.cardID;
    // this.name = "card_name";
    // this.art = undefined;
  }

  play() {}

  // spawnUnit() {}
}

export default CardModel;
