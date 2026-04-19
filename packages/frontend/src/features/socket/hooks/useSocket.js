import io from "socket.io-client";
import useSocketStore from "../../../stores/useSocketStore";
import { useCallback, useEffect } from "react";

const SOCKET_URL = "http://localhost:3500";

const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);
  // const roomId = useSocketStore((state)=>state.roomId);
  
  useEffect(() => {
    const connection = io(SOCKET_URL);
    setSocket(connection);

    return () => {
      connection.disconnect();
    };
  }, [setSocket]);

  //function to emit messages
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
};

export default useSocket;
