import { create } from "zustand";
import { devtools } from "zustand/middleware";

import io from "socket.io-client";
import { RoomDTO } from "../../../../packages/shared/schemas/schemas.js";
import { eventEmitter } from "../util/eventEmitter";

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
      socket?.on("chat:message", (val) => eventEmitter.emit("chat:message", val));

      /**
       * Lobby Events
       */
      socket?.on("lobby:change", (val, ack) => {
        eventEmitter.emit("lobby:change", val);
        ack?.({ status: "ok" });
      });

      /**
       * Room Events
       */
      socket?.on("room:join", (val) => eventEmitter.emit("room:join", val));
      socket?.on("room:change", (val) => {
        const res = RoomDTO.parse(val);
        set({ roomData: res });
      });

      /**
       * Game Events
       */
      socket?.on("room:start", (val) => eventEmitter.emit("room:start", val));
      // socket?.on("game:phase", (val) => eventEmitter.emit("game:change", val));

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
