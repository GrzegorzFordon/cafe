import { GAME_PHASES } from "@cafe/engine/config";
import GameAdvancedEffect from "@cafe/engine/effect/effects/gameAdvanced.effect";
import { eventEmitter } from "@cafe/shared/eventEmitter";
import { nanoid } from "nanoid";
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
    const id = nanoid().substring(0, 4);
    const eCache = [...this.effects];
    this.effects = [];
    console.log(`[EventBus] Processing`, id, eCache);
    while (eCache.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const nextEffect = eCache.shift();
      if (!nextEffect) break;
      console.log(`[EventBus] Next:`, id, nextEffect);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
    }
  }

  handleSimEffect(e) {
    console.log(`[EventBus] Caught:`, e.name);
    EventBus.instance.effects.push(e);
  }

  async handleGameAdvance(e) {
    console.log(`[EventBus] Caught Game Advance:`, e.phase);
    EventBus.instance.effects.push(e);
    _.defer(() => EventBus.instance.processEffects());
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
    console.log(`[EventBus] Connecting`);
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

  subscribeToGameEffects(newSub) {
    EventBus.instance.observers.push(newSub);
  }
  unsubscribeToGameEffects(sub) {
    EventBus.instance.observers.filter((val) => val != sub);
  }
}
export default EventBus.getInstance();
