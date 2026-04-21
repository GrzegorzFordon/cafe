import { useCallback, useEffect, useRef, useState } from "react";
import useSocket from "../../socket/hooks/useSocket";
import useAuthStore from "../../../stores/useAuthStore";
import { subscribe, unsubscribe } from "../../../util/events";
import { ServerToClientEvents } from "../../../../../shared/protocol";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Chat() {
  const { sendMessage } = useSocket();
  const accessTokenData = useAuthStore((state) => state.accessTokenData);

  const [msg, setMsg] = useState("");
  //   const [room, setRoom] = useState("");
  const [chat, setChat] = useState([
    { message: "first", room: "one", username: "someone" },
    { message: "second", room: "one", username: "else" },
  ]);

  const scrollDiv = useRef(null);

  const handleChatMessage = useCallback(
    (e) => {
      const newval = [...chat, e.detail];
      setChat(newval);
    },
    [chat],
  );

  useEffect(() => {
    subscribe(ServerToClientEvents.get("SendMessage"), handleChatMessage);

    return () => {
      unsubscribe(ServerToClientEvents.get("SendMessage"), handleChatMessage);
      unsubscribe(ServerToClientEvents.get("JoinRoom"));
    };
  }, [handleChatMessage]);

  useEffect(() => {
    scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage({
      message: msg,
      //   room: room,
      username: accessTokenData.username,
    });
    setMsg("");
  };



  return (
    <div className="flex flex-col size-full max-w-sm max-h-80 justify-center items-center gap-2 p-2 rounded bg-amber-950">
      <div
        ref={scrollDiv}
        className="flex z-5 bg-amber-900 border-4 border-amber-950 shadow text-black font-bold overflow-y-scroll px-4 py-2 size-full rounded-md justify-center items-center"
      >
        <ul className="size-full ">
          {chat.map((val) => (
            <li>
              {val.username}: {val.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex z-10 flex-col shadow size-full justify-center items-center gap-2 py-4 px-2 max-h-1/6 bg-amber-800 rounded ">
        {/* <form
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
        </form> */}

        <form
          className="flex justify-center size-full items-center gap-2"
          onSubmit={handleSendMessage}
        >
          <input
            className="p-2 bg-amber-50 rounded appearance-none w-full  text-gray-900 focus:outline-none"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="message"
          />
          <motion.button
            // whileHover={{ scale: 1.025, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="bg-amber-950 text-amber-100 font-bold rounded px-4 py-2 cursor-pointer hover:bg-amber-500 disabled:bg-gray-500 disabled:cursor-default disabled:opacity-45"
            disabled={!msg}
          >
            send
          </motion.button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
