import Room from "./Room";
import RoomsCard from "./RoomsCard";
import LobbyMenu from "./LobbyMenu";
import { subscribe, unsubscribe } from "../../../../util/events";
import { useCallback, useEffect, useState } from "react";

function Lobby() {
  const [rooms, setRooms] = useState([]);

  const handleLobbyUpdate = useCallback((e) => {
    setRooms(e.detail.rooms);
  }, []);

  useEffect(() => {
    subscribe("lobby:change", handleLobbyUpdate);
    return () => {
      unsubscribe("lobby:change", handleLobbyUpdate);
    };
  }, [handleLobbyUpdate]);

  return (
    <div className="flex size-full max-h-80 max-w-lg flex-col items-center justify-center gap-2 rounded bg-amber-950 p-2">
      <div className="flex size-full flex-col items-center justify-start gap-2 overflow-y-scroll rounded bg-amber-800 p-1 text-black italic">
        {rooms.map((room) => (
          <RoomsCard roomID={room.id} />
        ))}
      </div>

      <LobbyMenu />
    </div>
  );
}

export default Lobby;
