import sprite from "../assets/hexagon_png.png";
import spriteActive from "../assets/hex_active.png";
import spriteIntented from "../assets/hex_intent.png";
import useBoard from "../hooks/useBoard";
import CardVisual from "../card/CardVisual";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Unit from "../units/Unit";
import useIntent from "../hooks/useIntent";
import useCardList from "../hooks/useCardList";
/**
 * Client Tile component
 * Handles display based on props (different types, different status effects)
 */

function Tile({ coords }) {
  const { mousedOverHex } = useBoard();

  const ref = useRef();

  // const [intentCardZIndex, setIntentCardZIndex] = useState(0);
  // const [intentCardData, setIntentData] = useState();

  const { getIntentsByTarget } = useIntent();

  // const myIntents = useMemo(
  //   () => getIntentsByTarget(coords),
  //   [coords, getIntentsByTarget],
  // );

  const myIntents = getIntentsByTarget(coords);

  // const sprite = useCardList(myIntents[0] ?? null);
  // const cardIDFromFirstIntent;

  // useEffect(() => {
  //   const y = ref.current.getBoundingClientRect().y;
  //   setIntentCardZIndex(y);
  // }, [ref]);

  // const isactive = coords.isEqual(mousedOverHex);
  const isactive = coords.isEqual(mousedOverHex);
  // coords.q == mousedOverHex.q &&
  // coords.r == mousedOverHex.r &&
  // coords.s == mousedOverHex.s;

  return (
    <div
      ref={ref}
      className="flex size-full items-center justify-center select-none"
    >
      <img
        draggable="false"
        className="scale-220 scale-y-154 opacity-70"
        src={
          isactive
            ? spriteActive
            : myIntents.length > 0
              ? spriteIntented
              : sprite
        }
        // src={sprite}
        alt=""
      />

      {/* <div className="absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center">
        {coords.q == coords.r && <Unit unitID={1} />}
      </div> */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-1/2">
        {!isactive && <Unit />}
      </div> */}

      {myIntents.length > 0 && (
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
          // style={{ zIndex: intentCardZIndex }}
          className="absolute top-0 left-1/2 flex -translate-1/2 scale-200 items-center justify-center bg-green-400 select-none"
        >
          <CardVisual cardID={myIntents[0].cardID} />
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
          // style={{ zIndex: intentCardZIndex }}
          className="absolute top-0 left-1/2 flex -translate-1/2 scale-200 items-center justify-center bg-green-400 select-none"
        >
           <CardVisual /> 
        </motion.div>
      )}
 */
