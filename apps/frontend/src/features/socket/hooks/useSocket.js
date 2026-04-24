import useSocketStore from "../../../stores/useSocketStore";
// import { useCallback, useEffect } from "react";
import { useCallback } from "react";

const useSocket = () => {
  //socket is stored in zustand store
  const socket = useSocketStore((state) => state.socket);
  // const connect = useSocketStore((state) => state.connect);
  // const disconnect = useSocketStore((state) => state.disconnect);
  const setActiveRoomID = useSocketStore((state) => state.setActiveRoomID);

  // useEffect(() => {
  //   console.log("socket on");
  //   connect();
  //   return () => {
  //     console.log("socket off");
  //     // disconnect();
  //   };
  // }, [connect, disconnect]);

  //functions that implement all the client to server events
  //components that need those have to import the hook

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
        if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [setActiveRoomID, socket],
  );
  const createRoom = useCallback(
    (val) =>
      socket.emit("room:create", val, (res) => {
        console.log(res);
        if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [setActiveRoomID, socket],
  );
  const leaveRoom = useCallback(
    (val) =>
      socket.emit("room:leave", val, (res) => {
        console.log(res);
        if (res.status == "ok") setActiveRoomID("general");
      }),
    [setActiveRoomID, socket],
  );

  const startGame = useCallback(
    (val) => {
      socket.emit("game:start", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );

  // const playGame = useCallback(
  //   (val) => {
  //     socket.emit(ClientToServerEvents.get(""), val);
  //   },
  //   [socket],
  // );

  return {
    sendMessage,
    joinRoom,
    createRoom,
    leaveRoom,
    startGame,
    // playGame,
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

//receiving end taken over by auth store
// useEffect(() => {
//   //socket connects to every message type coming from the server
//   //and emits the relevant event. listeners can subscribe to events
//   console.log("got here");
//   socket?.offAny();
//   return () => {
//     socket?.offAny();
//   };
// }, [socket]);
