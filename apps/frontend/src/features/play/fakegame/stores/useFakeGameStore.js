import { create } from "zustand";
import { devtools } from "zustand/middleware";
import GameManager from "../../../../../../../packages/engine/game/game.controller";
import FakeGameController from "../fakegame/game.controller.fake";
import FakeGameModel from "../fakegame/game.model.fake";

const useFakeGameStore = create(
  devtools((set, get) => ({
    fakeGameController: new FakeGameController(),
    actions: [],
    setGameController: (fakeGameController) => {
      set({ fakeGameController: fakeGameController });
    },

    addAction: (action) => {
      set((state) => ({
        actions: [...state.actions, action],
      }));
    },

    getNextAction: () => {
      const nextAction = get().actions.shift();
      set((state) => ({
        actions: state.actions.filter((val) => val != nextAction),
        // actions: state.actions.slice(1),
        
      }));
      return nextAction;
    },
  })),
);

export default useFakeGameStore;
