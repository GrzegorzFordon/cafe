import pawnSprite from "../../assets/figurine.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Pawn() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="relative flex size-fit flex-col items-center"
    >
      <div className="absolute top-1/10 z-10 flex h-fit w-8/10 justify-center gap-px">
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
      </div>
      <img
        // onDrag={(event, info) => {
        //   console.log(info.point.x, info.point.y);
        // }}
        whileDrag={{ scale: 1.1 }}
        className="pointer-events-none z-1 size-fit select-none"
        src={pawnSprite}
      />
      <div className="absolute bottom-0 z-10 flex w-full justify-evenly text-2xl font-black text-black text-shadow-sm">
        <p className="text-red-400">1</p>
        <p className="text-green-400">1</p>
      </div>
    </motion.div>
  );
}
export default Pawn;
