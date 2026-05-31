import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useBoardStore = create(
  devtools((set) => ({
    boardRef: undefined,
    tileSize: 50,

    setBoardRef: (boardRef) => {
      set({ boardRef });
    },

    setTileSize: (tileSize) => {
      set({ tileSize });
    },
  })),
);
export default useBoardStore;
