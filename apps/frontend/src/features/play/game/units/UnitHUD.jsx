import exhaustedIcon from "../../../../assets/sleepy.png";
import chargedIcon from "../../../../assets/sun.png";
import crownSprite from "../assets/crown.png";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
function UnitHUD({
  atk,
  speed,
  hp,
  isFriendly,
  isExhausted,
  isCharged,
  isLeader,
  isLegalTarget,
}) {
  return (
    <div draggable={false} className="pointer-events-none select-none">
      <motion.p
        key={`hp${hp}`}
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="absolute right-0 -bottom-2 aspect-square size-5 text-center text-green-400 text-shadow-black/60 text-shadow-sm"
      >
        {hp ?? 7}
      </motion.p>
      <motion.p
        key={`atk${atk}`}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="absolute right-2 bottom-0 aspect-square size-5 text-center text-red-500 text-shadow-black/60 text-shadow-sm"
      >
        {atk ?? 0}
      </motion.p>
      <motion.p
        key={`speed${speed}`}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="absolute top-0 left-1/4 aspect-square size-5 -translate-1/2 text-center text-orange-300 text-shadow-black/60 text-shadow-sm"
      >
        {speed ?? 0}
      </motion.p>
      {isExhausted && (
        <img
          src={exhaustedIcon}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 scale-80 select-none"
        ></img>
      )}
      {isCharged && (
        <img
          src={chargedIcon}
          className="pointer-events-none absolute top-2/5 left-1/2 -z-20 -translate-1/2 scale-150"
        ></img>
      )}
      {!isFriendly && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-fit -translate-1/2 scale-80 items-center justify-center rounded-sm bg-red-950 text-sm text-red-300 opacity-80">
          ENEMY
        </div>
      )}

      {isLeader && (
        <img
          className="pointer-events-none absolute top-2/7 left-3/5 -translate-1/2 scale-45 rotate-18"
          src={crownSprite}
        />
      )}
      {isLegalTarget && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-fit -translate-1/2 scale-80 items-center justify-center rounded-sm bg-green-950 text-sm text-green-300 opacity-80">
          TARGET
        </div>
      )}
    </div>
  );
}
export default UnitHUD;
