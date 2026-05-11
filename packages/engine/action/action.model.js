import { nanoid } from "nanoid";

class Action {
  constructor() {
    this.id = nanoid();
    this.playerID = undefined;
    this.bonuses = [];
    // this.execute = this.execute.bind(this);
  }

  // execute(controller) {
  //   //executes the action (does stuff to the engine (game instance))
  //   this.bonuses.forEach((val) =>
  //     // controller.playerController.discardCard(this.playerID, val.id),
  //     {
  //       controller.playerController.discardCard(this.playerID, val.id);
  //       console.log(val);
  //     },
  //   );
  // }

  addBonus = (bonus) => {
    this.bonuses.push(bonus);
  };
}

export default Action;
