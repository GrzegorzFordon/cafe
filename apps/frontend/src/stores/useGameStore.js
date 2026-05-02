import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "../../../../packages/engine/game/game.controller";
import FakeGameController from "../features/play/fakegame/fakegame/game.controller.fake";

const useGameStore = create(
  devtools((set) => ({
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
  })),
);

export default useGameStore;
