// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function RoomsCard() {
  return (
    <motion.div
      whileHover={{ scale: 0.99 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col justify-center items-center size-full max-h-12 bg-amber-100 rounded select-none cursor-pointer"
    >
      RoomsCard
    </motion.div>
  );
}
export default RoomsCard;
