import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { publish } from "../util/events";

import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3500";

const useSocketStore = create(
  devtools((set, get) => ({
    socket: undefined,
    activeRoomID: "general",

    connect: () => {
      // console.log("Socket store is attempting to connect");
      if (get().socket) {
        // console.log("Attempted to connect socket, was already connected");
        return;
      }
      console.log("Socket Store: Connecting");
      const socket = io(SOCKET_URL);
      socket?.on("chat:message", (val) => publish("chat:message", val));
      socket?.on("room:join", (val) => publish("room:join", val));
      socket?.on("lobby:change", (val) => publish("lobby:change", val));
      socket?.on("room:change", (val) => publish("room:change", val));
      set({ socket });
    },
    disconnect: () => {
      if (!get().socket) return;
      console.log("Socket Store: Disconnecting");
      get().socket.disconnect();
      get().socket.offAny();
      set({ socket: undefined });
    },
    setActiveRoomID: (id) => {
      set({ activeRoomID: id });
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
