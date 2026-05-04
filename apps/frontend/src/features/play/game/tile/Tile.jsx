import sprite from "../assets/hexagon_png.png";
import spriteActive from "../assets/hex_active.png";
import spriteActioned from "../assets/hex_action.png";
import spriteBaseZone from "../assets/hex_baseZone.png";
import useBoard from "../hooks/useBoard.js";
import CardVisual from "../card/CardVisual.jsx";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import Unit from "../units/Unit.jsx";
import useAction from "../hooks/useAction.js";
import arrowSprite from "../assets/arrow_down.png";
import { BASE_COORDS, OP_BASE_COORDS } from "@cafe/engine/config";
import { useRef } from "react";
import useBoardStore from "../stores/useBoardStore.js";

function Tile({ hex }) {
  const { mousedOverHex, pixelFromHex } = useBoard(hex);
  const { getActionsByHex } = useAction();

  const ref = useRef();

  const position = pixelFromHex(hex);
  const tileSize = useBoardStore((state) => state.tileSize);

  const actions = getActionsByHex(hex);

  const isactive = hex.isEqual(mousedOverHex);
  const isBase = hex.isEqual(BASE_COORDS) || hex.isEqual(OP_BASE_COORDS);

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
      {isactive && (
        <motion.img
          animate={{ opacity: 1, transition: { duration: 0.05 } }}
          initial={{ opacity: 0 }}
          draggable="false"
          className="absolute scale-220 scale-y-154 opacity-100"
          src={spriteActive}
          alt=""
        />
      )}

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
