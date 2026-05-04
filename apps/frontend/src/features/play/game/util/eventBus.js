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

  async processEffects() {
    console.log("[EventBus] Processing");
    while (EventBus.instance.effects.length > 0) {
      const nextEffect = EventBus.instance.effects.shift();
      if (!nextEffect) break;
      console.log("[EventBus] Next: ", nextEffect.name);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  handleSimEffect(e) {
    console.log("[EventBus] Caught: ", e.name);
    EventBus.instance.effects.push(e);
  }

  async handleGameAdvance(e) {
    console.log("[EventBus] Caught Game Advance: ", e.phase);
    EventBus.instance.effects.push(e);
    await EventBus.instance.processEffects();
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
    console.log("[EventBus] Connecting");
    eventEmitter.on("sim:effect", EventBus.instance.handleSimEffect);
    eventEmitter.on("sim:advance", EventBus.instance.handleGameAdvance);
  }

  disconnect() {
    eventEmitter.off("sim:effect", EventBus.instance.handleSimEffect);
    eventEmitter.off("sim:advance", EventBus.instance.handleGameAdvance);
  }

  /**
   * OBSERVERS
   */

  observers = [];
  observersPerEvent = {};

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
