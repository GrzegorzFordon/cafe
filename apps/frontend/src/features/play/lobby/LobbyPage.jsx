// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import lobbytable from "../../assets/lobby_table.png";
import Chat from "./components/Chat.jsx";
import Lobby from "./components/Lobby.jsx";
import Room from "./components/Room.jsx";
import useSocketStore from "../../../stores/useSocketStore.js";

function LobbyPage() {
  // const activeRoomID = useSocketStore((state) => state.activeRoomID);
  const roomData = useSocketStore((state) => state.roomData);
  return (
    <div className="flex size-full max-h-96 max-w-xl items-center justify-center gap-2">
      {roomData && roomData.id != "general" ? <Room /> : <Lobby />}
    </div>
  );
}
export default LobbyPage;
