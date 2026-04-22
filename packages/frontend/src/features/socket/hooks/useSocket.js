// import io from "socket.io-client";
import useSocketStore from "../../../stores/useSocketStore";
import { useCallback, useEffect } from "react";
import { publish } from "../../../util/events";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../../shared/protocol";

const useSocket = () => {
  //socket is stored in zustand store
  const socket = useSocketStore((state) => state.socket);
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    //socket connects to every message type coming from the server
    //and emits the relevant event. listeners can subscribe to events

    socket?.on(ServerToClientEvents.get("SendMessage"), (val) =>
      publish(ServerToClientEvents.get("SendMessage"), val),
    );
    socket?.on(ServerToClientEvents.get("JoinRoom"), (val) =>
      publish(ServerToClientEvents.get("JoinRoom"), val),
    );

    return () => {
      socket?.offAny();
    };
  }, [socket]);

  //functions that implement all the client to server events
  //components that need those have to import the hook
  const sendMessage = useCallback(
    (val) =>
      socket.emit(ClientToServerEvents.get("SendMessage"), val, (res) => {
        console.log(res.status);
      }),
    [socket],
  );
  const joinRoom = useCallback(
    (val) =>
      socket.emit(ClientToServerEvents.get("JoinRoom"), val, (res) => {
        console.log(res);
      }),
    [socket],
  );

  const createRoom = useCallback(
    (val) =>
      socket.emit(ClientToServerEvents.get("CreateRoom"), val, (res) => {
        console.log(res);
      }),
    [socket],
  );
  // const leaveRoom = useCallback(
  //   (val) => {
  //     socket.emit(ClientToServerEvents.get(""), val);
  //   },
  //   [socket],
  // );
  // const startGame = useCallback(
  //   (val) => {
  //     socket.emit(ClientToServerEvents.get(""), val);
  //   },
  //   [socket],
  // );
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
    // leaveRoom,
    // startGame,
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
