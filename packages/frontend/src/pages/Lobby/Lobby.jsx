import { useEffect, useState } from "react";
import useSocket from "../../features/socket/hooks/useSocket";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useAuthStore from "../../stores/useAuthStore";

function Lobby() {
  const { emit, on } = useSocket();
  const accessTokenData = useAuthStore((state) => state.accessTokenData);

  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");

  const [chat, setChat] = useState([
    { message: "first", room: "one", username: "someone" },
    { message: "second", room: "one", username: "else" },
  ]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    emit("send_message", {
      message: msg,
      room: room,
      username: accessTokenData.username,
    });
    setMsg("");
  };

  const handleRoomMessage = (e) => {
    e.preventDefault();
    emit("join_room", {
      roomID: room,
    });
    setRoom("");
  };

  useEffect(() => {
    const handleMessage = (e) => {
      const newval = [...chat, e];
      setChat(newval);
    };

    const receiveMessage = on("send_message", (value) => {
      handleMessage(value);
    });

    const receiveRoomConfirmation = on("join_room", (value) => {
      console.log(value);
    });

    return () => {
      receiveMessage;
      receiveRoomConfirmation;
    };
  }, [chat, on]);

  return (
    <div className="flex flex-col-reverse size-full gap-4 justify-center items-center">
      <div className="flex flex-col shadow  justify-center items-center gap-4 p-4 size-full max-w-sm max-h-1/6 bg-amber-800 rounded ">
        <form className="flex justify-center items-center gap-4" onSubmit={handleSubmitMessage}>
          {/* <label>Room</label> */}
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
            onClick={handleRoomMessage}
          >
            set
          </motion.button>
        </form>

        <form className="flex justify-center items-center gap-4" onSubmit={handleSubmitMessage}>
          {/* <label>Message</label> */}
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
            onClick={handleSubmitMessage}
          >
            send
          </motion.button>
        </form>
      </div>
      <div className="flex bg-green-500 text-black font-bold p-4 size-full max-w-sm max-h-1/3 rounded justify-center items-center">
        <ul className="size-full ">
          {chat.map((val) => (
            <li key={val.message}>
              {val.username}: {val.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Lobby;
