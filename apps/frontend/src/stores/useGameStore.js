import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameController from "../../../../packages/engine/game/game.controller";
import FakeGameController from "../features/play/fakegame/fakegame/game.controller.fake";

const useGameStore = create(
  devtools((set) => ({
    gameController: new GameController(),
    // gameState: new GameModel(), //this will be the gamestate from engine??

    actions: [],

    setGameController: (gameController) => {
      set({ gameController: gameController });
    },

    setGameState: (gameState) => {
      set({ gameState: gameState });
    },

    addAction: (action) => {
      // console.log("Adding action: ", action);
      set((state) => ({ actions: [...state.actions, action] }));
      // console.log("new action: ", get().action);
    },

    resetActions: () => {
      set({ action: [] });
    },
  })),
);

export default useGameStore;
