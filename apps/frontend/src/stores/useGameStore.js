import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../packages/engine/game/game.manager";

const useGameStore = create(
  devtools((set, get) => ({
    gameManager: new GameManager("fakeID"),
    gameState: undefined, //this will be the gamestate from engine??

    intents: [],

    setGameManager: (gameManager) => {
      set({ gameManager: gameManager });
    },

    setGameState: (gameState) => {
      set({ gameState: gameState });
    },

    addIntent: (intent) => {
      // console.log("Adding intent: ", intent);
      set((state) => ({ intents: [...state.intents, intent] }));
      // console.log("new intents: ", get().intents);
    },

    resetIntents: () => {
      set({ intents: [] });
    },
  })),
);

export default useGameStore;
