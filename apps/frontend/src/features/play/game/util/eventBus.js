import { GAME_PHASES } from "@cafe/engine/config";
import GameAdvancedEffect from "@cafe/engine/effect/effects/gameAdvanced.effect";
import { eventEmitter } from "@cafe/shared/eventEmitter";
import _ from "lodash";

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
    const eCache = [...this.effects];
    this.effects = [];
    // console.log(`[EventBus] Processing`);
    while (eCache.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const nextEffect = eCache.shift();
      if (!nextEffect) break;
      console.log("[Event Bus] Next Effect", nextEffect);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
    }
  }

  handleSimEffect(e) {
    console.log(`[EventBus] Caught:`, e.name);
    EventBus.instance.effects.push(e);
  }

  async handleGameAdvance(e) {
    EventBus.instance.effects.push(e);
    _.defer(() => EventBus.instance.processEffects());
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
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

  async notifyObserversOfGameEffects(effect) {
    await Promise.all(EventBus.instance.observers.map((o) => o(effect)));
  }

  subscribeToGameEffects(sub) {
    console.log("Subscribing",sub)
    EventBus.instance.observers.push(sub);
  }
  unsubscribeToGameEffects(sub) {
    console.log("Unsubscribing",sub)
    EventBus.instance.observers.filter((val) => val !== sub);
  }
}
export default EventBus.getInstance();
