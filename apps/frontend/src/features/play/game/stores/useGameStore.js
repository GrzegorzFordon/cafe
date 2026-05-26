import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "@cafe/engine/game/game.controller";

const useGameStore = create(
  devtools((set) => ({
    gameController: undefined,
    actions: [],
    burnEffects: [],
    usedBurnEffects: [],
    mousedOverUnits: [],

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

    addMousedOverUnit: (unit) => {
      set((state) => ({ mousedOverUnits: [...state.mousedOverUnits, unit] }));
    },

    removeMousedOverUnit: (unit) => {
      set((state) => ({
        mousedOverUnits: state.mousedOverUnits.filter((val) => val !== unit),
      }));
    },
  })),
);

export default useGameStore;
