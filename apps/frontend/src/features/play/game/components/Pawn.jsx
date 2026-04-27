import { useEffect, useRef, useState } from "react";
import pawnSprite from "../assets/units/character_yellow_front.png";
import pawnSpriteA from "../assets/units/character_purple_front.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import useGame from "../hooks/useGame";

/**
 * Pawn component
 * TODO Pass sprite as prop
 */

function Pawn({ isEven }) {
  // const moveUnit = useGame();

  const [yPos, setYPos] = useState(100);
  const ref = useRef();

  useEffect(() => {
    setYPos(ref.current.getBoundingClientRect().y);
  }, []);

  return (
    <motion.div
      ref={ref}
      drag
      dragElastic
      dragMomentum={false}
      whileDrag={{ opacity: 0.3, transition: { duration: 0.2 } }}
      className="relative flex size-fit origin-center flex-col items-center select-none"
      onDrag={() => {
        const y = ref.current.getBoundingClientRect().y;
        setYPos(y);
      }}
      style={{ zIndex: Math.round(yPos) }}
    >
      <div className="absolute top-1/10 z-10 flex h-fit w-8/10 justify-center gap-px">
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
        <div className="rounded-1 top-0 h-3 w-full border border-gray-800 bg-green-400 opacity-60"></div>
      </div>
      <img
        className="pointer-events-none size-fit select-none hover:scale-105"
        src={isEven ? pawnSprite : pawnSpriteA}
      />
      <div className="absolute bottom-0 z-10 flex w-full justify-evenly text-2xl font-black text-black text-shadow-sm">
        <p className="text-red-400">1</p>
        <p className="z-50 text-green-400">1</p>
      </div>
      {/* <div className="absolute bottom-1/50 left-1/2 z-20 size-2 -translate-1/2 rounded-full bg-amber-500"></div> */}
    </motion.div>
  );
}
export default Pawn;

/**
 * pawn needs to have an offset from bottom value
 * on drag start, get the difference between the mousepos and that offset
 * per default the offset would be zero, so the mouseoffset would be mouse<->bottom of unit
 */
