import sprite from "../../assets/timer.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Timer() {
  return (
    <motion.img
      // drag
      // dragElastic={0.6}
      // dragMomentum={false}
      // whileDrag={{ scale: 1.1 }}
      className="absolute scale-80 origin-center select-none z-6 bottom-0 left-0"
      src={sprite}
    />
  );
}
export default Timer;
