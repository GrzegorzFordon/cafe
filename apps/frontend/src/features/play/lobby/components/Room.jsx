import useSocketStore from "../../../../stores/useSocketStore";
import useSocket from "../../../socket/hooks/useSocket";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { RoomDTO } from "@cafe/shared/schemas/schemas.js";

function Room() {
  const { leaveRoom, startGame } = useSocket();

  const roomData = useSocketStore((state) => state.roomData);
  return (
    <div className="relative flex size-full flex-col items-center justify-start gap-2 rounded bg-amber-800 p-2 font-bold text-black">
      <div className="flex w-full justify-start gap-2 rounded bg-amber-950 p-2">
        <motion.button
          className="cursor-pointer rounded bg-amber-200 p-2 hover:bg-amber-300"
          onClick={() => leaveRoom({ roomID: roomData.id })}
        >
          Leave
        </motion.button>
        <div className="flex size-full rounded p-2 text-amber-200 select-none">
          {roomData.id} ({roomData?.status})
        </div>
        <div className="w-full" />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded bg-amber-200 p-2 hover:bg-amber-300"
          onClick={() => startGame({ roomID: roomData.id })}
        >
          Play
        </motion.button>
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-2 rounded bg-amber-950">
        <p className="">{roomData?.hostId}</p>
        {roomData?.players &&
          roomData?.players.map((player) => (
            <p key={player}>Player: {player.id.substring(0, 5)}</p>
          ))}
      </div>
    </div>
  );
}
export default Room;
