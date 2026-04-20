import io from "socket.io-client";
import useSocketStore from "../../../stores/useSocketStore";
import { useCallback, useEffect } from "react";
import { publish } from "../../../util/events";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../../../shared/protocol";

const SOCKET_URL = "http://localhost:3500";

const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    const connection = io(SOCKET_URL);
    setSocket(connection);

    connection.on(ServerToClientEvents.get("SendMessage"), (val) =>
      publish(ServerToClientEvents.get("SendMessage"), val),
    );
    connection.on(ServerToClientEvents.get("JoinRoom"), (val) =>
      publish(ServerToClientEvents.get("JoinRoom"), val),
    );

    return () => {
      connection.disconnect();
      connection.offAny();
    };
  }, [setSocket]);

  const sendMessage = useCallback(
    (val) => socket.emit(ClientToServerEvents.get("SendMessage"), val),
    [socket],
  );

  const joinRoom = useCallback(
    (val) => socket.emit(ClientToServerEvents.get("JoinRoom"), val),
    [socket],
  );

  return {
    sendMessage,
    joinRoom,
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
