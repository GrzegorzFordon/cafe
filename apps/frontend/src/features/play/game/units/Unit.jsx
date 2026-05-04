// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import unitSprite from "../assets/units/character_yellow_front.png";
import unitSpriteA from "../assets/units/character_purple_front.png";
import { useEffect, useMemo } from "react";
import useBoard from "../hooks/useBoard";
import useAction from "../hooks/useAction";

import MoveAction from "@cafe/engine/action/actions/move.action.js";

function Unit({ unit }) {
  // const id = useRef(nanoid());
  // const id = useId();
  const { getActionsByID, addActionObject } = useAction();
  const { mousedOverHex, pixelFromHex, isHexWithinBoard } = useBoard();

  const sprite = useMemo(
    () => (unit?.unitID == 1 ? unitSprite : unitSpriteA),
    [unit],
  );
  // const [yPos, setYPos] = useState(100);
  // const ref = useRef();

  // useEffect(() => {
  //   setYPos(ref.current.getBoundingClientRect().y);
  // }, []);

  const myAction = useMemo(
    () => getActionsByID(unit?.id),
    [getActionsByID, unit?.id],
  );

  // useEffect(() => {
  //   console.log("UNIT VIEW", unit);
  // }, [unit]);

  const handleDragStart = () => {
    // console.log("Handle Drag", unit);
  };
  const handleDragEnd = () => {
    if (isHexWithinBoard(mousedOverHex))
      addActionObject(new MoveAction(unit, mousedOverHex));
  };

  const pos = pixelFromHex(unit.hex);

  return (
    <motion.div
      // ref={ref}
      layout
      className="UNIT absolute size-15 -translate-1/2 -translate-y-15 select-none"
      // style={{ zIndex: Math.round(yPos) + 5000 }}
      style={{ left: pos.x, top: pos.y }}
    >
      <motion.img
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        draggable="false"
        className="select-none"
        src={sprite}
      />
      <motion.div
        drag={myAction.length == 0}
        dragSnapToOrigin={myAction.length == 0}
        onDragStart={() => handleDragStart()}
        onDragEnd={() => handleDragEnd()}
        className="UNIT_MOVER_GHOST absolute top-1/2 left-1/2 size-full -translate-1/2 rounded-2xl"
        style={{ filter: myAction.length > 0 ? "brightness(0.4)" : "none" }}
      >
        <motion.img
          className="pointer-events-none size-fit opacity-55 select-none"
          draggable="false"
          src={sprite}
        />
      </motion.div>
      {/* <svg>
        <line
          x1={0}
          y1={0}
          x2={50}
          y2={10}
          style={{ stroke: "red", strokeWidth: 2 }}
        />
      </svg> */}
    </motion.div>
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
