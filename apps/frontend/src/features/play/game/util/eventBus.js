import { GAME_PHASES } from "@cafe/engine/config";
import GameAdvancedEffect from "@cafe/engine/effect/effects/gameAdvanced.effect";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import _ from "lodash";

const SEND_LOGS = 0;

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
    const eCache = [...EventBus.instance.effects];
    EventBus.instance.effects = [];
    if (SEND_LOGS) console.log(`[EventBus] Processing`);
    while (eCache.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const nextEffect = eCache.shift();
      if (!nextEffect) break;
      if (SEND_LOGS) console.log("[EventBus] Next Effect", nextEffect.name);
      await EventBus.instance.notifyObserversOfGameEffects(nextEffect);
    }
  }

  handleSimEffect(e) {
    if (SEND_LOGS) console.log(`[EventBus] Caught:`, e);
    EventBus.instance.effects.push(e);
  }

  async handleGameAdvance(e) {
    EventBus.instance.effects.push(e);
    _.defer(() => {
      EventBus.instance.processEffects();
    });
  }

  /**
   * SERVER
   */

  handleGameStartServer(e) {
    if (SEND_LOGS) console.log("[EventBus] SERVER Start", e);

    EventBus.instance.effects.push(
      new GameAdvancedEffect(GAME_PHASES.START, e),
    );
    _.defer(() => EventBus.instance.processEffects());
    // EventBus.instance.processEffects();
  }

  handleGameActionsServer(e) {
    if (SEND_LOGS) console.log("[EventBus] SERVER Actions", e);
    // e.forEach(ef=>EventBus.instance.effects.push(ef))
  }

  // handleGameUpdateServer(e) {
  //   console.log("[EventBus] SERVER Update", e);
  //   e.effects.forEach((ef) => EventBus.instance.effects.push(ef));
  //   // EventBus.instance.effects = e.effects;
  //   EventBus.instance.effects.push(new GameAdvancedEffect(e.phase));
  //   _.defer(() => {
  //     EventBus.instance.processEffects();
  //   });
  // }

  connectToServer() {
    if (SEND_LOGS) console.log("[EventBus] Connecting to server");

    // eventEmitter?.on("game:start", EventBus.instance.handleGameStartServer);
    eventEmitter?.on("game:actions", EventBus.instance.handleGameActionsServer);
  }

  connectToSim(emitter) {
    if (SEND_LOGS) console.log("[EventBus] Connecting to sim");

    EventBus.instance.effects = [];
    // EventBus.instance.disconnect();
    emitter?.on("sim:effect", EventBus.instance.handleSimEffect);
    emitter?.on("sim:advance", EventBus.instance.handleGameAdvance);
  }

  // disconnect(emitter) {
  //   EventBus.instance.effects = [];

  //   emitter?.off("sim:effect", EventBus.instance.handleSimEffect);
  //   emitter?.off("sim:advance", EventBus.instance.handleGameAdvance);
  //   eventEmitter?.off("game:start", EventBus.instance.handleGameStartServer);
  //   // emitter?.off("game:update", EventBus.instance.handleGameUpdateServer);
  //   eventEmitter?.off("game:actions", EventBus.instance.handleGameActionsServer);
  // }

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
    EventBus.instance.observers.delete(sub);
  }
}
export default EventBus.getInstance();
