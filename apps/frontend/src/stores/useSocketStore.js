import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { publish } from "../util/events";

import io from "socket.io-client";
import {RoomDTO} from "../../../../packages/shared/schemas/schemas.js";

const SOCKET_URL = "http://localhost:3500";

const useSocketStore = create(
  devtools((set, get) => ({
    socket: undefined,
    // activeRoomID: "general",
    roomData: undefined,

    connect: () => {
      if (get().socket) {
        return;
      }
      console.log("Socket Store: Connecting");
      const socket = io(SOCKET_URL);
      socket?.on("chat:message", (val) => publish("chat:message", val));
      socket?.on("room:join", (val) => publish("room:join", val));
      socket?.on("lobby:change", (val) => publish("lobby:change", val));
      // socket?.on("room:change", (val) => publish("room:change", val));
      socket?.on("room:change", (val) => {
        console.log(val);
        const res = RoomDTO.parse(val);
        set({ roomData: res });
      });
      set({ socket });
    },
    disconnect: () => {
      if (!get().socket) return;
      console.log("Socket Store: Disconnecting");
      get().socket.disconnect();
      get().socket.offAny();
      set({ socket: undefined, roomData: undefined });
    },
    setRoomData: (roomData) => {
      set({ roomData: roomData });
    },
  })),
);

export default useSocketStore;

