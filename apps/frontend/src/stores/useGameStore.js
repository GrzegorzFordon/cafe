import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../packages/engine/game/game.manager";

const useGameStore = create(
  devtools((set) => ({
    gameManager: new GameManager("fakeID"),
    gameState: undefined, //this will be the gamestate from engine??
    debugHand: [],

    setGameManager: (gameManager) => {
      set({ gameManager: gameManager });
    },

    setGameState: (gameState) => {
      set({ gameState: gameState });
    },

    setDebugHand: (hand) => set({ hand: hand }),
  })),
);

export default useGameStore;
