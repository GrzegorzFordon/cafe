/**
 * general card entity
 */
import { nanoid } from "nanoid";

class CardModel {
  constructor(options) {
    this.id = nanoid();
    this.cardID = options.cardID; //TODO move to schema
    this.playerID = options.playerID;
    this.schema = options.schema;
  }

  play(controller) {}

  // spawnUnit() {}
}

export default CardModel;
