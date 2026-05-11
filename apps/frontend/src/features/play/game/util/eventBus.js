import { GAME_PHASES } from "@cafe/engine/config";
import GameAdvancedEffect from "@cafe/engine/effect/effects/gameAdvanced.effect";
import { eventEmitter } from "@cafe/shared/eventEmitter";
import _ from "lodash";

const SEND_LOGS = 1;

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
      if (SEND_LOGS) console.log("[EventBus] Next Effect", nextEffect.name);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
    }
  }

  handleSimEffect(e) {
    if (SEND_LOGS) console.log(`[EventBus] Caught:`, e.name);
    EventBus.instance.effects.push(e);
  }

  async handleGameAdvance(e) {
    _.defer(() => {
      EventBus.instance.effects.push(e);
      EventBus.instance.processEffects();
    });
  }

  /**
   * SERVER
   */

  handleGameStartServer(e) {
    console.log("[EventBus] SERVER Start", e);
    EventBus.instance.effects.push(new GameAdvancedEffect(GAME_PHASES.START));
    _.defer(() => EventBus.instance.processEffects());
  }

  handleGameUpdateServer(e) {
    console.log("[EventBus] SERVER Update", e);
    e.effects.forEach((ef) => EventBus.instance.effects.push(ef));
    // EventBus.instance.effects = e.effects;
    EventBus.instance.effects.push(new GameAdvancedEffect(e.phase));
    _.defer(() => {
      EventBus.instance.processEffects();
    });
  }

  connect() {
    EventBus.instance.effects = [];
    EventBus.instance.disconnect();
    // eventEmitter.on("sim:effect", EventBus.instance.handleSimEffect);
    // eventEmitter.on("sim:advance", EventBus.instance.handleGameAdvance);
    eventEmitter.on("game:start", EventBus.instance.handleGameStartServer);
    eventEmitter.on("game:update", EventBus.instance.handleGameUpdateServer);
  }

  disconnect() {
    EventBus.instance.effects = [];
    // eventEmitter.off("sim:effect", EventBus.instance.handleSimEffect);
    // eventEmitter.off("sim:advance", EventBus.instance.handleGameAdvance);
    eventEmitter.off("game:start", EventBus.instance.handleGameStartServer);
    eventEmitter.off("game:update", EventBus.instance.handleGameUpdateServer);
  }

  /**
   * OBSERVERS
   */

  observers = new Set([]);

  async notifyObserversOfGameEffects(effect) {
    // await Promise.all(EventBus.instance.observers.map((o) => o(effect)));
    await Promise.all([...EventBus.instance.observers].map((o) => o(effect)));
  }

  subscribeToGameEffects(sub) {
    // if (SEND_LOGS) console.log("Subscribing", sub);
    EventBus.instance.observers.add(sub);
  }
  unsubscribeToGameEffects(sub) {
    // if (SEND_LOGS) console.log("Unsubscribing", sub);
    // EventBus.instance.observers.filter((val) => val !== sub);
    EventBus.instance.observers.delete(sub);
  }
}
export default EventBus.getInstance();
