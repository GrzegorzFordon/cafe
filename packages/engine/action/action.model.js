import { nanoid } from "nanoid";

class Action {
  constructor() {
    this.playerID = undefined;
    this.bonuses = [];
  }
  addBonus = (bonus) => {
    this.bonuses.push(bonus);
  };
}

export default Action;
