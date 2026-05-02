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
      // const nextEffect = getNextEffect();
      const nextEffect = EventBus.instance.effects.shift();
      if (!nextEffect) break;
      // await notifyObserversOfGameEffects(nextEffect);
      console.log("Next Effect", nextEffect);
      EventBus.instance.notifyObserversOfGameEffects(nextEffect);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    // advanceGame();
    console.log("TIME TO ADVANCE GAME");
  }

  handleSimEffect(e) {
    console.log("Event Bus caught Event", e);
    EventBus.instance.effects.push(e);
  }

  handleGameStart() {
    console.log("Event Bus caught Game Start");
    EventBus.instance.processEffects();
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
    console.log("Event Bus Connecting");
    eventEmitter.on("sim:effect", EventBus.instance.handleSimEffect);
    eventEmitter.on("sim:start", EventBus.instance.handleGameStart);
  }

  disconnect() {
    eventEmitter.off("sim:effect", EventBus.instance.handleSimEffect);
    eventEmitter.off("sim:start", EventBus.instance.handleGameStart);
  }

  /**
   * OBSERVERS
   */

  observers = [];

  async notifyObserversOfGameEffects(effect) {
    await Promise.all(EventBus.instance.observers.map((o) => o(effect)));
  }

  subscribeToGameEffects(newSub) {
    EventBus.instance.observers.push(newSub);
  }
  unsubscribeToGameEffects(sub) {
    EventBus.instance.observers.filter((val) => val != sub);
  }
}
export default EventBus.getInstance();
