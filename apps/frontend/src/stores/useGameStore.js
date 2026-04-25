//zustand store for the active game ??

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useGameStore = create(
  devtools((set) => ({
    gameManager: undefined,
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
