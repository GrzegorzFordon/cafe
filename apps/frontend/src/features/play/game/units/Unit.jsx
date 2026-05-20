// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import unitYellow from "../assets/units/character_yellow_front.png";
import unitBeige from "../assets/units/character_beige_front.png";
import unitPink from "../assets/units/character_pink_front.png";
import unitPurple from "../assets/units/character_purple_front.png";
import unitPulp from "../assets/units/unitPulp01.png";
import { useMemo, useRef } from "react";
import useBoard from "../hooks/useBoard";
import useAction from "../hooks/useAction";

import MoveAction from "@cafe/engine/action/actions/move.action.js";
import UnitHUD from "./UnitHUD";
import useValidate from "../hooks/useValidate";
import { eventEmitter } from "@cafe/shared/eventEmitter.js";
import useSocketStore from "../../../../stores/useSocketStore";
import useSocket from "../../../socket/hooks/useSocket";

function Unit({ unit }) {
  const { getActionsByUnit, addActionObject } = useAction();
  const { mousedOverHex, pixelFromHex, isHexWithinBoard } = useBoard();
  const { getLegalMoves } = useValidate();
  const sprite = useMemo(() => {
    switch (unit.unitID) {
      case "0L01":
        return unitBeige;
      case "0L02":
        return unitPink;
      case "0L03":
        return unitPurple;
      case "0U01":
        return unitYellow;
      case "0U02":
        return unitPulp;
      default:
        return unitYellow;
    }
  }, [unit]);
  const ref = useRef();

  const { isFirstPlayer } = useSocket();

  const zIndex = useMotionValue(100);

  const rotHex = useMemo(
    () => (isFirstPlayer ? unit.hex : unit.hex.mirror()),
    [isFirstPlayer, unit.hex],
  );

  const pos = pixelFromHex(rotHex);
  const socketID = useSocketStore((state) => state.socketID);
  const isFriendly = socketID == unit.playerID;

  const isExhausted = useMemo(
    () => unit.modifiers.some((val) => val.name === "Exhausted"),
    [unit.modifiers],
  );
  const isCharged = useMemo(
    () => unit.modifiers.some((val) => val.name === "Charged"),
    [unit.modifiers],
  );

  const myAction = useMemo(
    () => getActionsByUnit(unit),
    [getActionsByUnit, unit],
  );

  const hasActions = useMemo(() => myAction.length > 0, [myAction]);
  const isLeader = useMemo(() => unit.unitID.includes("L"), [unit.unitID]);

  const isDraggable = isFriendly && !isExhausted;

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
      onLayoutMeasure={() => handleDrag()}
      className="UNIT CONTAINER absolute size-12 h-15 -translate-1/2 -translate-y-12 select-none"
      style={{
        left: pos.x,
        top: pos.y,
        zIndex: zIndex,
        // scale: isLeader ? 2 : 1,
      }}
    >
      <motion.img
        draggable="false"
        className="UNIT select-none"
        initial={{ scale: 0 }}
        animate={{ scale: isLeader ? 1 : 0.9 }}
        exit={{ scale: 0 }}
        src={sprite}
        style={{ filter: hasActions ? "brightness(0.4)" : "none" }}
      />

      <motion.div
        drag={!hasActions && isFriendly && !isExhausted}
        dragSnapToOrigin={!hasActions}
        onPointerDown={() => {
          if (!hasActions) handleDragStart();
        }}
        onPointerUp={() => eventEmitter.emit("unit:drag:end", unit)}
        onDragStart={() => handleDragStart()}
        onDrag={() => handleDrag()}
        onDragEnd={() => handleDragEnd()}
        className="UNIT_MOVER_GHOST absolute top-1/2 left-1/2 size-full -translate-1/2 rounded-2xl hover:not-[isDraggable]:cursor-grab active:not-[isDraggable]:cursor-grabbing"
        style={{
          filter: hasActions || isExhausted ? "brightness(0.4)" : "none",
          pointerEvents: isDraggable ? "all" : "none",
          opacity: 0,
          scale: isLeader ? 1 : 0.9,
        }}
        whileDrag={{ opacity: 0.5 }}
      >
        <img
          className="pointer-events-none size-fit select-none"
          draggable="false"
          src={sprite}
        />
      </motion.div>

      <UnitHUD
        atk={unit.atk}
        hp={unit.hp}
        speed={unit.speed}
        isFriendly={isFriendly}
        isExhausted={isExhausted}
        isCharged={isCharged}
        isLeader={isLeader}
      />

      <div className="size-fit bg-amber-50 text-sm">
        {/* {JSON.stringify(unit.modifiers)} */}
        {/* {isLeader ? "leader" : "x"} */}
      </div>
    </motion.div>
  );
}
export default Unit;
