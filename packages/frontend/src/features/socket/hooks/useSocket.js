import io from "socket.io-client";
import useSocketStore from "../../../stores/useSocketStore";
import { useCallback, useEffect } from "react";
import { publish } from "../../../util/events";

const SOCKET_URL = "http://localhost:3500";

const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);

  useEffect(() => {
    const connection = io(SOCKET_URL);
    setSocket(connection);

    connection.on("send_message", (val) => publish("chat:message", val));
    connection.on("join_room", (val) => publish("room:join", val));

    return () => {
      connection.disconnect();
      connection.offAny();
    };
  }, [setSocket]);

  const sendMessage = useCallback(
    (val) => {
      socket.emit("send_message", val);
    },
    [socket],
  );

  const joinRoom = useCallback(
    (val) => socket.emit("join_room", val),
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
