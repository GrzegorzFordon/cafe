import sprite from "../assets/hexagon_png.png";
import spriteActive from "../assets/hex_active.png";
import spriteActioned from "../assets/hex_action.png";
import spriteBaseZone from "../assets/hex_baseZone.png";
import useBoard from "../hooks/useBoard.js";
import CardVisual from "../card/CardVisual.jsx";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import Unit from "../units/Unit.jsx";
import useAction from "../hooks/useAction.js";
import arrowSprite from "../assets/arrow_down.png";
import { BASE_HEX_MAP } from "@cafe/engine/config";
import { useRef } from "react";
import useBoardStore from "../stores/useBoardStore.js";

function Tile({ hex, isActive }) {
  const { mousedOverHex, pixelFromHex } = useBoard(hex);
  const { getActionsByHex } = useAction();

  const ref = useRef();

  const position = pixelFromHex(hex);
  const tileSize = useBoardStore((state) => state.tileSize);

  const actions = getActionsByHex(hex);

  const isHover = hex.isEqual(mousedOverHex);
  const isBase = BASE_HEX_MAP.values().some((v) => hex.isEqual(v));
  // const isSpawn = BASE_HEX_MAP.values().some((v)=> )
  // const isBase = false;

  return (
    <div
      ref={ref}
      className="absolute flex items-center justify-center select-none"
      style={{
        left: position.x - tileSize * 0.5,
        top: position.y - tileSize * 0.5,
        width: tileSize,
        height: tileSize,
      }}
    >
      <img
        draggable="false"
        className="scale-220 scale-y-154 opacity-70"
        src={actions.length > 0 ? spriteActioned : sprite}
        alt=""
      />
      {isBase && (
        <img
          draggable="false"
          className="absolute scale-170 scale-y-117 opacity-70"
          src={spriteBaseZone}
          alt=""
        />
      )}

      <AnimatePresence>
        {isActive && (
          <motion.img
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            draggable="false"
            className="absolute scale-198 scale-y-139"
            src={spriteActive}
            alt=""
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActive && isHover && (
          <motion.img
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            draggable="false"
            className="absolute scale-220 scale-y-154"
            src={spriteActive}
            alt=""
          />
        )}
      </AnimatePresence>

      {/* <div className="absolute size-fit rounded-sm bg-amber-50 text-sm">
        {hex.q}|
        {hex.r}|
        {hex.s}
      </div> */}

      {actions.length > 0 && (
        <motion.div
          draggable={false}
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
          // style={{ zIndex: actionCardZIndex }}
          className="absolute top-0 left-1/2 flex -translate-1/2 scale-200 items-center justify-center select-none"
        >
          {actions[0].unit ? (
            <img src={arrowSprite} />
          ) : (
            <CardVisual card={actions[0].card} />
          )}
        </motion.div>
      )}
    </div>
  );
}
export default Tile;

// const sprite = useCardList(myActions[0] ?? null);
// const cardIDFromFirstAction;

// useEffect(() => {
//   const y = ref.current.getBoundingClientRect().y;
//   setActionCardZIndex(y);
// }, [ref]);

// const [actionCardZIndex, setActionCardZIndex] = useState(0);
// const [actionCardData, setActionData] = useState();
