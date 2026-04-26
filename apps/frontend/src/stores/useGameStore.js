import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../packages/engine/game/game.manager";

const useGameStore = create(
  devtools((set) => ({
    gameManager: new GameManager("fakeID"),
    gameState: undefined,

    setGameManager: (gameManager) => {
      set({ gameManager: gameManager });
    },

    setGameState: (gameState) => {
      set({ gameState: gameState });
    },
  })),
);

export default useGameStore;
