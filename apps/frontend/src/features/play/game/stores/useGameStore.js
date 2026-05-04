import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "@cafe/engine/game/game.controller";

const useGameStore = create(
  devtools((set, get) => ({
    gameController: new GameController(),
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
      }));
      return nextEffect;
    },
  })),
);

export default useGameStore;
