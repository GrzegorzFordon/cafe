import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../../../packages/engine/game/game.controller";
import FakeGameController from "./fakegame/game.controller.fake";
import FakeGameModel from "./fakegame/game.model.fake";

const useFakeGameStore = create(
  devtools((set, get) => ({
    fakeGameController: new FakeGameController(),
    fakeGameModel: new FakeGameModel(),

    setGameModel: (fakeGameModel) => {
      set({ fakeGameModel: fakeGameModel });
    },

    setGameController: (fakeGameController) => {
      set({ fakeGameController: fakeGameController });
    },

    intents: [],
    addIntent: (intent) => {
      set((state) => ({
        intents: [...state.intents, intent],
      }));
      console.log(get().intents.length);
    },

    getNextIntent: () => {
      const nextIntent = get().intents.shift();
      set((state) => ({
        intents: state.intents.filter((val) => val != nextIntent),
      }));
    },
  })),
);

export default useFakeGameStore;
