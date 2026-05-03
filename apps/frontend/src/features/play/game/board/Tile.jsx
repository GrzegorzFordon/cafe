import sprite from "../assets/hexagon_png.png";
import spriteActive from "../assets/hex_active.png";
import spriteActioned from "../assets/hex_action.png";
import spriteBaseZone from "../assets/hex_baseZone.png";
import useBoard from "../hooks/useBoard";
import CardVisual from "../card/CardVisual";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import Unit from "../units/Unit";
import useAction from "../hooks/useAction.js";
import arrowSprite from "../assets/arrow_down.png";
import { BASE_COORDS, OP_BASE_COORDS } from "@cafe/engine/config";
import { useRef } from "react";

function Tile({ coords, unit }) {
  const { mousedOverHex } = useBoard();

  const ref = useRef();

  // const [actionCardZIndex, setActionCardZIndex] = useState(0);
  // const [actionCardData, setActionData] = useState();

  const { getActionsByTarget } = useAction();

  // const myActions = useMemo(
  //   () => getActionsByTarget(coords),
  //   [coords, getActionsByTarget],
  // );

  const myActions = getActionsByTarget(coords);

  // const sprite = useCardList(myActions[0] ?? null);
  // const cardIDFromFirstAction;

  // useEffect(() => {
  //   const y = ref.current.getBoundingClientRect().y;
  //   setActionCardZIndex(y);
  // }, [ref]);

  const isactive = coords.isEqual(mousedOverHex);

  const isBase = coords.isEqual(BASE_COORDS) || coords.isEqual(OP_BASE_COORDS);

  return (
    <div
      ref={ref}
      className="flex size-full items-center justify-center select-none"
    >
      {isBase && (
        <img
          draggable="false"
          className="absolute scale-170 scale-y-117 opacity-70"
          src={spriteBaseZone}
          alt=""
        />
      )}
      <img
        draggable="false"
        className="scale-220 scale-y-154 opacity-70"
        src={
          isactive
            ? spriteActive
            : myActions.length > 0
              ? spriteActioned
              : sprite
        }
        alt=""
      />

      {/* <div className="absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center">
        {coords.q == coords.r && <Unit unitID={1} />}
      </div> */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-1/2">
        {!isactive && <Unit />}
      </div> */}
      {/* <h1 className="absolute top-1/2 left-1/2 -translate-1/2 bg-amber-50 text-sm">
        {coords.q}/{coords.r}
      </h1> */}
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        {unit && <Unit unitID={unit} />}
      </div>
      {myActions.length > 0 && (
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
          {myActions[0].unitID ? (
            <img src={arrowSprite} />
          ) : (
            <CardVisual cardID={myActions[0].cardID} />
          )}
        </motion.div>
      )}
    </div>
  );
}
export default Tile;

/**
 *       {isactive && (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
          // style={{ zIndex: actionCardZIndex }}
          className="absolute top-0 left-1/2 flex -translate-1/2 scale-200 items-center justify-center bg-green-400 select-none"
        >
           <CardVisual /> 
        </motion.div>
      )}
 */
