import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../packages/engine/game/game.controller";
import FakeGameController from "../features/play/fakegame/fakegame/game.controller.fake";

const useGameStore = create(
  devtools((set) => ({
    gameManager: new GameManager(),
    // gameState: new GameModel(), //this will be the gamestate from engine??

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
