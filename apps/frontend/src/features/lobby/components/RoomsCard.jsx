// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useSocket from "../../socket/hooks/useSocket";

function RoomsCard({ roomID }) {
  const { joinRoom } = useSocket();

  return (
    <motion.div
      onClick={() => joinRoom({ roomID: roomID })}
      whileHover={{ scale: 0.99 }}
      whileTap={{ scale: 0.98 }}
      className="flex size-full max-h-12 cursor-pointer flex-col items-center justify-center rounded bg-amber-100 select-none"
    >
      RoomsCard {roomID ?? "no id"}
    </motion.div>
  );
}
export default RoomsCard;
