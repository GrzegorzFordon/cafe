import { GAME_PHASES } from "@cafe/engine/config";
import GameAdvancedEffect from "@cafe/engine/effect/effects/gameAdvanced.effect";
import { eventEmitter } from "@cafe/shared/eventEmitter";

class EventBus {
  static instance = null;
  effects = [];

  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  constructor(options) {
    console.log("Creating new EventBus", options);
    // this.gameStartCallback = options?.gameStartCallback;
    // console.log(this.gameStartCallback);
    // EventBus.instance = new EventBus(gameStartCallback);
  }

  async processEffects() {
    console.log("Processing Effects");
    while (EventBus.instance.effects.length > 0) {
      const nextEffect = EventBus.instance.effects.shift();
      if (!nextEffect) break;
      console.log("Next Effect", nextEffect);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  handleSimEffect(e) {
    EventBus.instance.effects.push(e);
  }

  // async handleGameStart() {
  //   console.log("Event Bus caught Game Start");
  //   await EventBus.instance.processEffects();

  //   console.log("Event Bus is emitting GameAdvanceEffect");
  //   await EventBus.instance.notifyObserversOfGameEffects(
  //     new GameAdvancedEffect(GAME_PHASES.START),
  //   );
  // }
  async handleGameAdvance(e) {
    console.log("Event Bus caught Game Advance", e);
    await EventBus.instance.processEffects();
    await EventBus.instance.notifyObserversOfGameEffects(e);
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
    console.log("Event Bus Connecting");
    eventEmitter.on("sim:effect", EventBus.instance.handleSimEffect);
    // eventEmitter.on("sim:start", EventBus.instance.handleGameStart);
    eventEmitter.on("sim:advance", EventBus.instance.handleGameAdvance);
  }

  disconnect() {
    eventEmitter.off("sim:effect", EventBus.instance.handleSimEffect);
    // eventEmitter.off("sim:start", EventBus.instance.handleGameStart);
    eventEmitter.off("sim:advance", EventBus.instance.handleGameAdvance);
  }

  /**
   * OBSERVERS
   */

  observers = [];
  observersPerEvent = {};

  async notifyObserversOfGameEffects(effect) {
    await Promise.all(EventBus.instance.observers.map((o) => o(effect)));
    // await Promise.all(EventBus.instance.observersPerEvent[effect])
  }

  subscribeToGameEffects(newSub) {
    EventBus.instance.observers.push(newSub);
  }
  unsubscribeToGameEffects(sub) {
    EventBus.instance.observers.filter((val) => val != sub);
  }

  // subToSpecificEventTypeOnly(sub, type) {
  //   const hasType = this.observersPerEvent.has(type);
  //   if (!hasType) EventBus.instance.observersPerEvent[type] = [];
  //   EventBus.instance.observersPerEvent[type].push(sub);
  // }
}
export default EventBus.getInstance();
