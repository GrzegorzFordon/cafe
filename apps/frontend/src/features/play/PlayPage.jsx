import { useEffect, useState } from "react";
import useSocketStore from "../../stores/useSocketStore";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";

function PlayPage() {
  //   const activeRoomID = useSocketStore((state) => state.activeRoomID);
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex size-full max-h-72 max-w-lg flex-col items-center justify-center">
      <button
        className="rounded bg-amber-500 font-bold text-black select-none px-4 py-2 cursor-pointer"
        onClick={() => setShowGame(!showGame)}
      >
        swap
      </button>
      {showGame ? <GamePage /> : <LobbyPage />}
    </div>
  );
}
export default PlayPage;
