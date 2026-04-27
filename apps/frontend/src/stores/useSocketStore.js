import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { publish } from "../util/events";

import io from "socket.io-client";
import { RoomDTO } from "../../../../packages/shared/schemas/schemas.js";

const SOCKET_URL = "http://localhost:3500";

const useSocketStore = create(
  devtools((set, get) => ({
    socket: undefined,
    roomData: undefined,

    connect: () => {
      if (get().socket) return;

      console.log("Socket Store: Connecting");
      const socket = io(SOCKET_URL);

      /**
       * Chat Events
       */
      socket?.on("chat:message", (val) => publish("chat:message", val));

      /**
       * Lobby Events
       */
      socket?.on("lobby:change", (val, ack) => {
        publish("lobby:change", val);
        ack?.({ status: "ok" });
      });

      /**
       * Room Events
       */
      socket?.on("room:join", (val) => publish("room:join", val));
      socket?.on("room:change", (val) => {
        const res = RoomDTO.parse(val);
        set({ roomData: res });
      });

      /**
       * Game Events
       */
      socket?.on("game:start", (val) => publish("game:start", val));
      socket?.on("game:phase", (val) => publish("game:change", val));

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
