import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSocketStore = create(
  devtools((set) => ({
    socket: undefined,
    isConnected: false,
    roomId: undefined,

    setSocket: (socket) => {
      set({ socket: socket });
    },

    setRoomId: (roomId) => {
      set({ roomId: roomId });
    },
  })),
);

export default useSocketStore;
