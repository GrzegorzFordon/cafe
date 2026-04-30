import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../../../packages/engine/game/game.controller";
import FakeGameController from "./fakegame/game.controller.fake";
import FakeGameModel from "./fakegame/game.model.fake";

const useFakeGameStore = create(
  devtools((set, get) => ({
    fakeGameController: new FakeGameController(),
    intents: [],
    setGameController: (fakeGameController) => {
      set({ fakeGameController: fakeGameController });
    },

    addIntent: (intent) => {
      set((state) => ({
        intents: [...state.intents, intent],
      }));
    },

    getNextIntent: () => {
      const nextIntent = get().intents.shift();
      set((state) => ({
        intents: state.intents.filter((val) => val != nextIntent),
      }));
      return nextIntent;
    },
  })),
);

export default useFakeGameStore;
