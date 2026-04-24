import { useCallback, useEffect, useRef, useState } from "react";
import useSocket from "../../../socket/hooks/useSocket";
import useAuthStore from "../../../../stores/useAuthStore";
import { subscribe, unsubscribe } from "../../../../util/events";
// import { ServerToClientEvents } from "../../../../../shared/protocol";
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

  // const handleRoomJoin = (e) => {
  //   console.log(e.detail);
  //   const newVal = [...chat, `Joined Room ${e.id}`];
  //   setChat(newVal);
  // };

  useEffect(() => {
    subscribe("chat:message", handleChatMessage);
    // subscribe("room:join", handleRoomJoin);

    return () => {
      unsubscribe("chat:message", handleChatMessage);
      // unsubscribe("room:join", handleRoomJoin);
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
    <div className="flex size-full max-h-80 max-w-sm flex-col items-center justify-center gap-2 rounded bg-amber-950 p-2">
      <div
        ref={scrollDiv}
        className="z-5 flex size-full items-center justify-center overflow-y-scroll rounded-md border-4 border-amber-950 bg-amber-900 px-4 py-2 font-bold text-black shadow"
      >
        <ul className="size-full">
          {chat.map((val) => (
            <li>
              {val.username}: {val.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="z-10 flex size-full max-h-1/6 flex-col items-center justify-center gap-2 rounded bg-amber-800 p-1 shadow">
        <form
          className="flex size-full items-center justify-center gap-2"
          onSubmit={handleSendMessage}
        >
          <input
            className="size-full appearance-none rounded bg-amber-50 p-2 text-gray-900 focus:outline-none"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="message"
          />
          <motion.button
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="cursor-pointer rounded bg-amber-950 px-4 py-2 font-bold text-amber-100 hover:bg-amber-500 disabled:cursor-default disabled:bg-gray-500 disabled:opacity-45"
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
