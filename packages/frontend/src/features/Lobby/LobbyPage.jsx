// import { useCallback, useEffect, useRef, useState } from "react";
// import useSocket from "../../features/socket/hooks/useSocket";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import useAuthStore from "../../stores/useAuthStore";
// import { subscribe, unsubscribe } from "../../util/events";
import { ServerToClientEvents } from "../../../../shared/protocol.js";
// import lobbytable from "../../assets/lobby_table.png";
import Chat from "./components/Chat.jsx";
import RoomsList from "./components/Rooms.jsx";
import Room from "./components/Room.jsx";

function Lobby() {
  // const { joinRoom } = useSocket();
  // const accessTokenData = useAuthStore((state) => state.accessTokenData);

  // const handleRoomJoinedMessage = useCallback((e) => {
  //   console.log(e.detail);
  // }, []);

  // useEffect(() => {
  //   subscribe(ServerToClientEvents.get("JoinRoom"), handleRoomJoinedMessage);

  //   return () => {
  //     unsubscribe(
  //       ServerToClientEvents.get("JoinRoom"),
  //       handleRoomJoinedMessage,
  //     );
  //   };
  // }, [handleRoomJoinedMessage]);

  //HANDLERS: OUTGOING

  // const handleJoinRoom = (e) => {
  //   e.preventDefault();
  //   joinRoom({ roomID: room });
  // };

  return (
    <div className="flex relative  size-full max-w-4xl gap-2 justify-center items-center">
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
