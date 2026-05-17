import useSocketStore from "../../../stores/useSocketStore";
import { useCallback, useMemo } from "react";
// import eventBus from "../../play/game/util/eventBus";

const useSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const socketID = useSocketStore((state) => state.socketID);
  const roomData = useSocketStore((state) => state.roomData);
  const setRoomData = useSocketStore((state) => state.setRoomData);
  const setActionsSubAck = useSocketStore((state) => state.setActionsSubAck);

  const isFirstPlayer = useMemo(() => true, []);

  /**
   * Chat Actions
   */
  const sendMessage = useCallback(
    (val) =>
      socket.emit("chat:message", val, (res) => {
        console.log(res.status);
      }),
    [socket],
  );

  /**
   * Room Actions
   */
  const joinRoom = useCallback(
    (val) =>
      socket.emit("room:join", val, (res) => {
        // console.log(res);
        // if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [socket],
  );
  const createRoom = useCallback(
    (val) =>
      socket.emit("room:create", val, (res) => {
        // console.log(res);
        // if (res.status == "ok") setActiveRoomID(res.roomID);
      }),
    [socket],
  );
  const leaveRoom = useCallback(
    (val) =>
      socket.emit("room:leave", val, (res) => {
        // console.log(res);
        if (res.status == "ok") setRoomData(undefined);
      }),
    [setRoomData, socket],
  );

  /**
   * Game Actions
   */
  const startGame = useCallback(
    (val) => {
      // eventBus.connectToServer();
      socket.emit("game:start", val, (res) => {
        console.log(res);
      });
    },
    [socket],
  );

  const sendActions = useCallback(
    (val) => {
      socket.emit("game:actions", val, (res) => {
        if (res.status === "ok") {
          setActionsSubAck(true);
        }
      });
    },
    [setActionsSubAck, socket],
  );
  // const finishGame = useCallback(
  //   (val) => {
  //     socket.emit("game:finish", val, (res) => {
  //       console.log(res);
  //     });
  //   },
  //   [socket],
  // );

  return {
    isFirstPlayer,
    sendMessage,
    joinRoom,
    createRoom,
    leaveRoom,
    startGame,
    sendActions,
    // finishGame,
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
