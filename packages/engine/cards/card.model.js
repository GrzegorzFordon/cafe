/**
 * general card entity
 */
import { nanoid } from "nanoid";

class CardModel {
  constructor(options) {
    this.id = nanoid();
    this.cardID = options.cardID;
    this.schema = options.schema;
  }

  play() {}

  // spawnUnit() {}
}

export default CardModel;
