import Room from "./Room";
import RoomsCard from "./RoomsCard";
import LobbyMenu from "./LobbyMenu";
import { useCallback, useEffect, useState } from "react";
import { eventEmitter } from "../../../../util/eventEmitter.js";

function Lobby() {
  const [rooms, setRooms] = useState([]);

  const handleLobbyUpdate = useCallback((e) => {
    setRooms(e.detail.rooms);
  }, []);

  useEffect(() => {
    eventEmitter.on("lobby:change", handleLobbyUpdate);
    return () => {
      eventEmitter.off("lobby:change", handleLobbyUpdate);
    };
  }, [handleLobbyUpdate]);

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 rounded bg-amber-950 p-2">
      <div className="flex size-full flex-col items-center justify-start gap-2 overflow-y-scroll rounded bg-amber-800 p-1 text-black italic">
        {rooms?.map((room) => (
          <RoomsCard roomID={room.id} />
        ))}
      </div>

      <LobbyMenu />
    </div>
  );
}

export default Lobby;
