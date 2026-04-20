import { useCallback, useEffect, useState } from "react";
import useSocket from "../../features/socket/hooks/useSocket";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useAuthStore from "../../stores/useAuthStore";
import { subscribe, unsubscribe } from "../../util/events";
import { ServerToClientEvents } from "../../../../shared/protocol";

function Lobby() {
  const { sendMessage, joinRoom } = useSocket();
  const accessTokenData = useAuthStore((state) => state.accessTokenData);

  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [chat, setChat] = useState([
    { message: "first", room: "one", username: "someone" },
    { message: "second", room: "one", username: "else" },
  ]);

  //HANDLERS: INCOMING

  const handleChatMessage = useCallback(
    (e) => {
      const newval = [...chat, e.detail];
      setChat(newval);
    },
    [chat],
  );

  const handleRoomJoinedMessage = useCallback((e) => {
    console.log(e.detail);
  }, []);

  useEffect(() => {
    subscribe(ServerToClientEvents.get("SendMessage"), handleChatMessage);
    subscribe(ServerToClientEvents.get("JoinRoom"), handleRoomJoinedMessage);

    return () => {
      unsubscribe(ServerToClientEvents.get("SendMessage"), handleChatMessage);
      unsubscribe(
        ServerToClientEvents.get("JoinRoom"),
        handleRoomJoinedMessage,
      );
    };
  }, [handleChatMessage, handleRoomJoinedMessage]);

  //HANDLERS: OUTGOING

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage({
      message: msg,
      room: room,
      username: accessTokenData.username,
    });
    setMsg("");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    joinRoom({ roomID: room });
  };

  return (
    <div className="flex flex-col-reverse size-full gap-4 justify-center items-center">
      <div className="flex flex-col shadow  justify-center items-center gap-4 p-4 size-full max-w-sm max-h-1/6 bg-amber-800 rounded ">
        <form
          className="flex justify-center items-center gap-4"
          onSubmit={handleJoinRoom}
        >
          <input
            className="p-2 bg-amber-50 rounded appearance-none  text-gray-900 focus:outline-none"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="room"
          />

          <motion.button
            whileHover={{ scale: 1.025, transition: { duration: 0.1 } }}
            whileTap={{ scale: 1 }}
            className="bg-amber-950 text-amber-100 font-bold rounded px-4 py-2 cursor-pointer hover:bg-amber-500"
          >
            set
          </motion.button>
        </form>

        <form
          className="flex justify-center items-center gap-4"
          onSubmit={handleSendMessage}
        >
          <input
            className="p-2 bg-amber-50 rounded appearance-none  text-gray-900 focus:outline-none"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="message"
          />
          <motion.button
            whileHover={{ scale: 1.025, transition: { duration: 0.1 } }}
            whileTap={{ scale: 1 }}
            className="bg-amber-950 text-amber-100 font-bold rounded px-4 py-2 cursor-pointer hover:bg-amber-500"
          >
            send
          </motion.button>
        </form>
      </div>
      <div className="flex bg-green-500 text-black font-bold p-4 size-full max-w-sm max-h-1/3 rounded justify-center items-center">
        <ul className="size-full ">
          {chat.map((val) => (
            <li>
              {val.username}: {val.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Lobby;
