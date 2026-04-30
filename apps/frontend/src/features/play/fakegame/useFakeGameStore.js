import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../../../packages/engine/game/game.controller";
import FakeGameController from "./fakegame/game.controller.fake";
import FakeGameModel from "./fakegame/game.model.fake";

const useFakeGameStore = create(
  devtools((set) => ({
    fakeGameController: new FakeGameController(),
    fakeGameModel: new FakeGameModel(),

    setGameModel: (fakeGameModel) => {
      set({ fakeGameModel: fakeGameModel });
    },
    
    setGameController: (fakeGameController) => {
      set({ fakeGameController: fakeGameController });
    },
  })),
);

export default useFakeGameStore;
