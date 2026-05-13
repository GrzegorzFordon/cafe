import { useCallback, useEffect } from "react";
import useSocketStore from "../../stores/useSocketStore";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import Chat from "./lobby/components/Chat";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import useGame from "./game/hooks/useGame";
import useGameStore from "./game/stores/useGameStore";
// import { RoomDTO } from "@cafe/shared/schemas/schemas.js";

function PlayPage() {
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);
  const roomData = useSocketStore((state) => state.roomData);
  const socketID = useSocketStore((state) => state.socketID);
  const setActionsSubAck = useSocketStore((state) => state.setActionsSubAck);
  const resetActions = useGameStore((state) => state.resetActions);
  const { startGame, processActions } = useGame();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const handleGameStart = useCallback(
    (e) => {
      console.log("GAMEPAGE", e);
      setActionsSubAck(false);
      resetActions();
      startGame(e);
    },
    [resetActions, setActionsSubAck, startGame],
  );

  const handleGameActions = useCallback(
    (e) => {
      console.log("GAMEPAGE", e);
      processActions(e);
    },
    [processActions],
  );

  useEffect(() => {
    eventEmitter.on("game:start", handleGameStart);
    eventEmitter.on("game:actions", handleGameActions);
    return () => {
      eventEmitter.off("game:start", handleGameStart);
      eventEmitter.off("game:actions", handleGameActions);
    };
  }, [handleGameActions, handleGameStart]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 p-2 pb-0">
      <div className="flex size-full flex-col items-center justify-center gap-2 text-sm text-black">
        {/* <Chat /> */}
        {roomData && roomData.id != "general" && roomData.status == 1 ? (
          <GamePage />
        ) : (
          <LobbyPage />
        )}
        {/* <p>{JSON.stringify(roomData)}</p> */}
        <p className="absolute bottom-2 left-2 text-start text-amber-50/50">
          {socketID}
        </p>
      </div>
    </div>
  );
}
export default PlayPage;
