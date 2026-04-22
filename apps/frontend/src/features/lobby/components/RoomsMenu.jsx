// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useSocket from "../../socket/hooks/useSocket";

function RoomsListMenu() {
  const { createRoom } = useSocket();

  return (
    <div className="flex size-full max-h-12 items-center justify-evenly gap-2 rounded bg-amber-700 p-2">
      <motion.button
        onClick={() => createRoom()}
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className="size-full cursor-pointer rounded bg-amber-800 font-bold text-black hover:bg-amber-400"
      >
        CREATE ROOM
      </motion.button>
      {/* <motion.button
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className="size-full bg-amber-800 text-black font-bold hover:bg-amber-400 cursor-pointer rounded"
      >
        (second button?)
      </motion.button> */}
    </div>
  );
}
export default RoomsListMenu;
