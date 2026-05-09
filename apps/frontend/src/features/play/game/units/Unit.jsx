// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import unitSprite from "../assets/units/character_yellow_front.png";
import unitSpriteA from "../assets/units/character_purple_front.png";
import { useMemo, useRef } from "react";
import useBoard from "../hooks/useBoard";
import useAction from "../hooks/useAction";

import MoveAction from "@cafe/engine/action/actions/move.action.js";
import UnitHUD from "./UnitHUD";
import useValidate from "../hooks/useValidate";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";

function Unit({ unit }) {
  const { getActionsByUnit, addActionObject } = useAction();
  const { mousedOverHex, pixelFromHex, isHexWithinBoard } = useBoard();
  const { getLegalMoves } = useValidate();
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

  const handleDragStart = () => {
    eventEmitter.emit("unit:drag:start", unit);
  };

  const handleDrag = () => {
    const yPos = Math.round(ref.current.getBoundingClientRect().y);
    zIndex.set(yPos);
  };

  const handleDragEnd = () => {
    eventEmitter.emit("unit:drag:end", unit);
    if (!isHexWithinBoard(mousedOverHex)) return;
    if (mousedOverHex.isEqual(unit.hex)) return; //change to more general legal targets
    if (!getLegalMoves(unit).some((val) => val.isEqual(mousedOverHex))) return;
    addActionObject(new MoveAction(unit, mousedOverHex));
  };

  return (
    <motion.div
      ref={ref}
      layout
      animate={{ scale: 1 }}
      onLayoutMeasure={() => handleDrag()}
      className="UNIT CONTAINER absolute size-15 -translate-1/2 -translate-y-15 select-none"
      style={{ left: pos.x, top: pos.y, zIndex: zIndex }}
    >
      <AnimatePresence>
        <motion.img
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          exit={{ scale: 0 }}
          draggable="false"
          className="UNIT select-none"
          src={sprite}
        />
      </AnimatePresence>

      <motion.div
        drag={!hasActions}
        dragSnapToOrigin={!hasActions}
        onPointerDown={() => {
          if (!hasActions) handleDragStart();
        }}
        onPointerUp={() => eventEmitter.emit("unit:drag:end", unit)}
        onDragStart={() => handleDragStart()}
        onDrag={() => handleDrag()}
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

      <UnitHUD atk={unit.atk} speed={unit.speed} />
    </motion.div>
  );
}
export default Unit;
