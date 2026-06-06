import KeywordAbility from "../keyword.ability.js";

class TauntKeyword extends KeywordAbility {
  constructor(options) {
    super(options);
    this.reach = options.reach ?? 2;
    // this.tauntedUnits = [];
  }

  init(controller) {
    //sub to unit spawned,died,moved events and call trigger
    console.log("initializing taunt keyword");
    controller.eventEmitter.on("sim:effect", this.trigger);
  }

  //not implemented
  shutdown(controller) {
    controller.eventEmitter.off("sim:effect", this.trigger);
  }

  trigger() {
    //get all units within range, give enemy ones taunted modifier.
  }
}
export default TauntKeyword;
