import { useEffect } from "react";
import useSocketStore from "../../stores/useSocketStore";
import LobbyPage from "./lobby/LobbyPage";
import GamePage from "./game/GamePage";
import Chat from "./lobby/components/Chat";
// import { subscribe, unsubscribe } from "../../util/events";
import { RoomDTO } from "@cafe/shared/schemas/schemas.js";

function PlayPage() {
  //   const activeRoomID = useSocketStore((state) => state.activeRoomID);
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  // const [showGame, setShowGame] = useState(false);

  const roomData = useSocketStore((state) => state.roomData);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 p-2 pb-0">
      {/* <button
        className="cursor-pointer rounded bg-amber-500 px-4 py-2 font-bold text-black select-none"
        onClick={() => setShowGame(!showGame)}
      >
        swap
      </button> */}
      <div className="flex size-full items-center justify-center gap-2">
        {/* <Chat /> */}
        {roomData && roomData.id != "general" && roomData.status == 1 ? (
          <GamePage />
        ) : (
          <LobbyPage />
        )}
      </div>
    </div>
  );
}
export default PlayPage;
