// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useSocket from "../../../socket/hooks/useSocket";

function LobbyMenu() {
  const { createRoom } = useSocket();

  return (
    <div className="flex size-full max-h-12 items-center justify-evenly gap-2 rounded bg-amber-700 p-1">
      <motion.button
        onClick={() => createRoom()}
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className="size-full cursor-pointer rounded bg-amber-800 font-bold text-black hover:bg-amber-400"
      >
        CREATE ROOM
      </motion.button>
    </div>
  );
}
export default LobbyMenu;
