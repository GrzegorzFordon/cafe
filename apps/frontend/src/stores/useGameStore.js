//zustand store for the active game ??

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useGameStore = create(
  devtools((set) => ({
    game: undefined,

    setGame: (game) => {
      set({ game: game });
    },
  })),
);

export default useGameStore;
