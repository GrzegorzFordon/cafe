import { useState } from "react";
import useSocket from "../../features/socket/hooks/useSocket";

function Lobby() {
  const { socket } = useSocket();

  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: msg, room: room });
  };

  return (
    <div className="s-9/10 bg-amber-200 ">
      <form onSubmit={handleClick}>
        <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button>send</button>
      </form>
    </div>
  );
}
export default Lobby;
