import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "@cafe/engine/game/game.controller";

const useGameStore = create(
  devtools((set) => ({
    gameController: undefined,
    actions: [],
    burnEffects: [],
    usedBurnEffects: [],

    setGameController: (gameController) => {
      set({ gameController: gameController });
    },

    addAction: (action) => {
      set((state) => ({ actions: [...state.actions, action] }));
    },

    resetActions: () => {
      set({ actions: [] });
    },

    addBurnEffect: (effect) => {
      set((state) => ({ burnEffects: [...state.burnEffects, effect] }));
    },

    resetBurnEffects: () => {
      set({ burnEffects: [] });
    },

    setUsedBurnEffects: (val) => {
      set({ usedBurnEffects: val });
    },

    resetUsedBurnEffects: () => {
      set({ usedBurnEffects: [] });
    },
  })),
);

export default useGameStore;
