import { useCallback, useEffect } from "react";
import useSocketStore from "../../stores/useSocketStore";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import Chat from "./lobby/components/Chat";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import useGame from "./game/hooks/useGame";
// import { RoomDTO } from "@cafe/shared/schemas/schemas.js";

function PlayPage() {
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);
  const roomData = useSocketStore((state) => state.roomData);
  const socketID = useSocketStore((state) => state.socketID);

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
      startGame(e);
    },
    [startGame],
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
        {/* <p>{JSON.stringify(roomData)}</p>
        <p>{socketID}</p> */}
      </div>
    </div>
  );
}
export default PlayPage;
