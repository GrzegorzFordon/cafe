// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// import { useEffect, useRef, useState } from "react";
import unitSprite from "../assets/units/character_yellow_front.png";
import unitSpriteA from "../assets/units/character_purple_front.png";
import { useMemo } from "react";
import useBoard from "../hooks/useBoard";
import useIntent from "../hooks/useIntent";

/**
 * Pawn component
 * TODO Pass sprite as prop
 */

function Unit({ unitID }) {
  const { addMoveUnitIntent } = useIntent();
  const { mousedOverHex } = useBoard();

  const sprite = useMemo(
    () => (unitID == 0 ? unitSprite : unitSpriteA),
    [unitID],
  );
  // const [yPos, setYPos] = useState(100);
  // const ref = useRef();

  // useEffect(() => {
  //   setYPos(ref.current.getBoundingClientRect().y);
  // }, []);

  /**
   * instead of setting a "set intented" flag, have the useintents hook return info about intents of specific type AND specific ID
   * then components can simply check if they are on it
   */

  const handleDrag = () => {
    const isWithinBoard =
      Math.abs(mousedOverHex.q) < 4 &&
      Math.abs(mousedOverHex.r) < 4 &&
      Math.abs(mousedOverHex.s) < 4;
    if (isWithinBoard) addMoveUnitIntent(unitID, mousedOverHex);
  };

  return (
    <div
      // ref={ref}
      className="UNIT absolute -top-7 left-0 size-15 -translate-1/2 select-none"
      // style={{ zIndex: Math.round(yPos) + 5000 }}
    >
      <img draggable="false" className="select-none" src={sprite} />

      <motion.div
        drag
        dragSnapToOrigin
        onDragEnd={() => handleDrag()}
        className="UNIT_MOVER_GHOST absolute top-1/2 left-1/2 size-full -translate-1/2 rounded-2xl"
      >
        <img
          className="pointer-events-none size-fit opacity-55 select-none"
          draggable="false"
          src={sprite}
        />
      </motion.div>
    </div>
  );
}
export default Unit;

/**
 * pawn needs to have an offset from bottom value
 * on drag start, get the difference between the mousepos and that offset
 * per default the offset would be zero, so the mouseoffset would be mouse<->bottom of unit
 */

/*
      onDrag={() => {
        const y = ref.current.getBoundingClientRect().y;
        setYPos(y);
        console.log(ref.current.getBoundingClientRect().y);
      }}

      */
