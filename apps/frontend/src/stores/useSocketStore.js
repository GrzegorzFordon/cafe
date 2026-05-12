import { create } from "zustand";
import { devtools } from "zustand/middleware";

import io from "socket.io-client";
import { RoomDTO } from "@cafe/shared/schemas/schemas.js";
import { eventEmitter } from "@cafe/shared/eventEmitter";
import eventBus from "../features/play/game/util/eventBus";

const SOCKET_URL = "http://localhost:3500";

const useSocketStore = create(
  devtools((set, get) => ({
    socket: undefined,
    roomData: undefined,
    socketID: undefined,

    actionsSubAck: false,

    connect: () => {
      if (get().socket) return;
      eventBus.connectToServer();
      console.log("[Socket Store] Connecting");
      const socket = io(SOCKET_URL);

      socket?.on("socket:id", (val) => set({ socketID: val }));

      /**
       * Chat Events
       */
      socket?.on("chat:message", (val) =>
        eventEmitter.emit("chat:message", val),
      );

      /**
       * Lobby Events
       */
      socket?.on("lobby:change", (val) =>
        eventEmitter.emit("lobby:change", val),
      );

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

      // socket?.on("room:start", (val) => eventEmitter.emit("room:start", val));

      socket?.on("socket:game:start", (val) => eventEmitter.emit("game:start", val));
      socket?.on("socket:game:update", (val) => eventEmitter.emit("game:actions", val));
      // socket?.on("game:update", (val) => eventEmitter.emit("game:update", val));

      set({ socket });
    },

    disconnect: () => {
      if (!get().socket) return;
      // eventBus.disconnect();
      console.log("[Socket Store] Disconnecting");
      get().socket.disconnect();
      get().socket.offAny();
      set({ socket: undefined, roomData: undefined });
    },

    setRoomData: (roomData) => {
      set({ roomData: roomData });
    },

    setActionsSubAck: (val) => {
      set({ actionsSubAck: val });
    },
  })),
);

export default useSocketStore;
