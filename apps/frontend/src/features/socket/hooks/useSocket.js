import useSocketStore from "../../../stores/useSocketStore";
// import { useCallback, useEffect } from "react";
import { useCallback } from "react";

const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  // const roomData = useSocketStore((state) => state.roomData);
  const setRoomData = useSocketStore((state) => state.setRoomData);

  const sendMessage = useCallback(
    (val) =>
      socket.emit("chat:message", val, (res) => {
        console.log(res.status);
      }),
    [socket],
  );
  const joinRoom = useCallback(
    (val) =>
      socket.emit("room:join", val, (res) => {
        console.log(res);
        // if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [socket],
  );
  const createRoom = useCallback(
    (val) =>
      socket.emit("room:create", val, (res) => {
        console.log(res);
        // if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [socket],
  );
  const leaveRoom = useCallback(
    (val) =>
      socket.emit("room:leave", val, (res) => {
        console.log(res);
        if (res.status == "ok") setRoomData(undefined);
      }),
    [setRoomData, socket],
  );
  const startGame = useCallback(
    (val) => {
      socket.emit("game:start", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );
  const playCard = useCallback(
    (val) => {
      socket.emit("game:card", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );
  const playAlt = useCallback(
    (val) => {
      socket.emit("game:alt", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );
  const playMove = useCallback(
    (val) => {
      socket.emit("game:move", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );
  const finishGame = useCallback(
    (val) => {
      socket.emit("game:finish", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );

  return {
    sendMessage,
    joinRoom,
    createRoom,
    leaveRoom,
    startGame,
    finishGame,
    playCard,
    playAlt,
    playMove,
  };
};

export default useSocket;

/*  //function to emit messages
  const emit = useCallback(
    (e, data) => {
      if (socket) socket.emit(e, data);
    },
    [socket],
  );

  //function to subscribe to messages
  const on = useCallback(
    (e, func) => {
      if (socket) socket.on(e, func);
    },
    [socket],
  );
  return { socket, emit, on };

  */
