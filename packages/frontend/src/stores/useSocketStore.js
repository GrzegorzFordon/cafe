import { create } from "zustand";
import { devtools } from "zustand/middleware";

import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3500";

const useSocketStore = create(
  devtools((set, get) => ({
    socket: undefined,

    connect: async () => {
      if (get().socket) return;
      const socket = io(SOCKET_URL);
      set({ socket });
    },
    disconnect: () => {
      if (!get().socket) return;
      get().socket.disconnect();
      set({ socket: undefined });
    },
  })),
);

export default useSocketStore;

// isConnected: false,
// roomId: undefined,
// setSocket: (socket) => {
//   set({ socket: socket });
// },

// setRoomId: (roomId) => {
//   set({ roomId: roomId });
// },
