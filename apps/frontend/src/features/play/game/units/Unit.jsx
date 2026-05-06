// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue } from "motion/react";
import unitSprite from "../assets/units/character_yellow_front.png";
import unitSpriteA from "../assets/units/character_purple_front.png";
import { useMemo, useRef } from "react";
import useBoard from "../hooks/useBoard";
import useAction from "../hooks/useAction";

import MoveAction from "@cafe/engine/action/actions/move.action.js";
import UnitHUD from "./UnitHUD";

function Unit({ unit }) {
  const { getActionsByUnit, addActionObject } = useAction();
  const { mousedOverHex, pixelFromHex, isHexWithinBoard } = useBoard();

  const sprite = useMemo(
    () => (unit?.unitID == 1 ? unitSprite : unitSpriteA),
    [unit],
  );
  const ref = useRef();
  const zIndex = useMotionValue(100);
  const pos = pixelFromHex(unit.hex);

  const myAction = useMemo(
    () => getActionsByUnit(unit),
    [getActionsByUnit, unit],
  );

  const hasActions = useMemo(() => myAction.length > 0, [myAction]);

  const handleDragStart = () => {};

  const handleDrag = () => {
    const yPos = Math.round(ref.current.getBoundingClientRect().y);
    zIndex.set(yPos);
  };

  const handleDragEnd = () => {
    if (isHexWithinBoard(mousedOverHex))
      addActionObject(new MoveAction(unit, mousedOverHex));
  };

  return (
    <motion.div
      ref={ref}
      layout
      onLayoutMeasure={() => handleDrag()}
      className="UNIT CONTAINER absolute size-15 -translate-1/2 -translate-y-15 select-none"
      style={{ left: pos.x, top: pos.y, zIndex: zIndex }}
    >
      <motion.img
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        draggable="false"
        className="UNIT select-none"
        src={sprite}
      />

      <motion.div
        drag={!hasActions}
        dragSnapToOrigin={!hasActions}
        onDragStart={() => handleDragStart()}
        onDragEnd={() => handleDragEnd()}
        className="UNIT_MOVER_GHOST absolute top-1/2 left-1/2 size-full -translate-1/2 rounded-2xl"
        style={{ filter: hasActions ? "brightness(0.4)" : "none" }}
      >
        <motion.img
          className="pointer-events-none size-fit opacity-55 select-none"
          draggable="false"
          src={sprite}
        />
      </motion.div>
      
      <UnitHUD />
    </motion.div>
  );
}
export default Unit;
