import { useState } from "react";
import pawnSprite from "../../assets/pawns/character_yellow_front.png";
import pawnSpriteA from "../../assets/pawns/character_purple_front.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Pawn({ isEven }) {
  const [yPos, setYPos] = useState(100);

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="relative flex size-fit flex-col items-center"
      onDrag={(event, info) => {
        // console.log(info.point.x, info.point.y);
        setYPos(info.point.y);
      }}
      style={{ zIndex: yPos }}
    >
      <div className="absolute top-1/10 z-10 flex h-fit w-8/10 justify-center gap-px">
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
      </div>
      <img
        whileDrag={{ scale: 1.1 }}
        className="pointer-events-none size-fit select-none"
        src={isEven ? pawnSprite : pawnSpriteA}
      />
      <div className="absolute bottom-0 z-10 flex w-full justify-evenly text-2xl font-black text-black text-shadow-sm">
        <p className="text-red-400">1</p>
        <p className="z-50 text-green-400">1</p>
      </div>
    </motion.div>
  );
}
export default Pawn;
