// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function RoomsListMenu() {
  return (
    <div className="size-full bg-amber-700 max-h-12 flex justify-evenly items-center rounded gap-2 p-2">
      <motion.button
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className="size-full bg-amber-800 text-black font-bold hover:bg-amber-400 cursor-pointer rounded"
      >
        CREATE ROOM
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95, transition: { duration: 0.05 } }}
        className="size-full bg-amber-800 text-black font-bold hover:bg-amber-400 cursor-pointer rounded"
      >
        (second button?)
      </motion.button>

    </div>
  );
}
export default RoomsListMenu;
