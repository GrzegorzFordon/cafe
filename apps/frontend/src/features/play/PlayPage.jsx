import { useEffect } from "react";
import useSocketStore from "../../stores/useSocketStore";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import Chat from "./lobby/components/Chat";
// import { RoomDTO } from "@cafe/shared/schemas/schemas.js";

function PlayPage() {
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);
  const roomData = useSocketStore((state) => state.roomData);
  const socketID = useSocketStore((state) => state.socketID);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 p-2 pb-0">
      <div className="flex size-full flex-col items-center justify-center gap-2 text-sm text-black">
        {/* <Chat /> */}
        {roomData && roomData.id != "general" && roomData.status == 1 ? (
          <GamePage />
        ) : (
          <LobbyPage />
        )}
        <p>{JSON.stringify(roomData)}</p>
        <p>{socketID}</p>
      </div>
    </div>
  );
}
export default PlayPage;
