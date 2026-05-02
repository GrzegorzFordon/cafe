import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "@cafe/engine/game/game.controller";
// import eventBus from "../util/eventBus.js";
// import eventBus from "../util/eventBus";

const useGameStore = create(
  devtools((set, get) => ({
    gameController: new GameController(),
    // eventBus: eventBus,
    // eventBus: EventBusFN,
    actions: [],
    effects: [],

    setGameController: (gameController) => {
      set({ gameController: gameController });
    },

    addAction: (action) => {
      set((state) => ({ actions: [...state.actions, action] }));
    },

    resetActions: () => {
      set({ actions: [] });
    },

    getNextAction: () => {
      const nextAction = get().actions.shift();
      set((state) => ({
        actions: state.actions.filter((val) => val != nextAction),
        // actions: state.actions.slice(1),
      }));
      return nextAction;
    },

    addEffect: (effect) => {
      set((state) => ({ effects: [...state.effects, effect] }));
    },

    resetEffects: () => {
      set({ effects: [] });
    },

    getNextEffect: () => {
      const nextEffect = get().effects.shift();
      set((state) => ({
        effects: state.effects.filter((val) => val != nextEffect),
        // effects: state.effects.slice(1),
      }));
      return nextEffect;
    },
  })),
);

export default useGameStore;
