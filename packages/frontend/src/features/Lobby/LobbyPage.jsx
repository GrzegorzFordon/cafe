// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import lobbytable from "../../assets/lobby_table.png";
import Chat from "./components/Chat.jsx";
import RoomsList from "./components/Rooms.jsx";
import Room from "./components/Room.jsx";

function Lobby() {
  return (
    <div className="relative flex size-full max-w-4xl items-center justify-center gap-2">
      <Chat />
      <RoomsList />
      <Room />
      {/* <img
        className="absolute select-none z-8  max-w-2/3 object-scale-down scale-50 -bottom-10 -right-20"
        src={lobbytable}
      />
      <img
        className="absolute  select-none z-0  max-w-2/3  scale-50 bottom-20 -left-20"
        src={lobbytable}
      /> */}
    </div>
  );
}
export default Lobby;
