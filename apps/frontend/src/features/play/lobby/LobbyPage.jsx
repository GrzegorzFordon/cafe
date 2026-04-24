// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import lobbytable from "../../assets/lobby_table.png";
import Chat from "./components/Chat.jsx";
import Lobby from "./components/Lobby.jsx";
import Room from "./components/Room.jsx";
import useSocketStore from "../../../stores/useSocketStore.js";

// import { useEffect } from "react";

function LobbyPage() {
  const activeRoomID = useSocketStore((state) => state.activeRoomID);
  // const connect = useSocketStore((state) => state.connect);
  // const disconnect = useSocketStore((state) => state.disconnect);

  // useEffect(() => {
  //   connect();
  //   return () => {
  //     disconnect();
  //   };
  // }, [connect, disconnect]);



  return (
    <div className="flex size-full flex-col items-center p-4 justify-center gap-2">
      {/* <h1 className="flex items-center justify-center rounded bg-amber-200 p-2 font-bold text-black">
        {activeRoomID}
      </h1> */}
      <div className="relative flex size-full max-h-96 max-w-4xl items-center justify-center gap-2">
        {/* <Chat /> */}
        {activeRoomID == "general" ? <Lobby /> : <Room />}
        {/* <RoomsList />
        <Room /> */}
        {/* <img
        className="absolute select-none z-8  max-w-2/3 object-scale-down scale-50 -bottom-10 -right-20"
        src={lobbytable}
        />
        <img
        className="absolute  select-none z-0  max-w-2/3  scale-50 bottom-20 -left-20"
        src={lobbytable}
        /> */}
      </div>
    </div>
  );
}
export default LobbyPage;
