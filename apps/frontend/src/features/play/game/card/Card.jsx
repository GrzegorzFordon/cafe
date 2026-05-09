// eslint-disable-next-line no-unused-vars
import {
  AnimatePresence,
  easeOut,
  motion,
  useDragControls,
  Reorder,
  useMotionValue,
  useSpring,
} from "motion/react";
import CardVisual from "./CardVisual.jsx";
import useBoard from "../hooks/useBoard.js";
import useAction from "../hooks/useAction.js";
import PlayAction from "@cafe/engine/action/actions/play.action.js";
import BurnAction from "@cafe/engine/action/actions/burn.action.js";
import { useMemo, useRef } from "react";
import ReactRough, { Line, Rectangle } from "rough-react-wrapper";
// import rough from "roughjs";

/**
 * Client side Card component
 * Handles Display and Drag Events (play card, burn card)
 */

const MAX_HAND_FAN_ANGLE_DEGREES = 10;

const BURN_TRESHOLD_X_MIN = 350;
const BURN_TRESHOLD_Y_MAX = 150;

function Card({ order, card, index }) {
  const { mousedOverHex, isMousedOverHexWithinBoard, boardPos } = useBoard();
  const { addActionObject, hasActionsOfType } = useAction();
  const isBurning = useMotionValue(0);
  const ref = useRef();

  const isPlayed = hasActionsOfType(card.id, "Play");
  const isBurned = hasActionsOfType(card.id, "Burn");

  const angle = MAX_HAND_FAN_ANGLE_DEGREES * (index - 0.5);

  const dragOffsetMotionValueX = useMotionValue(0);
  const dragOffsetMotionValueY = useMotionValue(0);
  const dragOffsetSpringValueX = useSpring(dragOffsetMotionValueX, {
    damping: 100,
    mass: 5,
  });
  const dragOffsetSpringValueY = useSpring(dragOffsetMotionValueY, {
    damping: 100,
    mass: 5,
  });

  const dragDeltaMotionValueX = useMotionValue(0);
  const dragDeltaMotionValueY = useMotionValue(0);
  const dragDeltaSpringValueX = useSpring(dragDeltaMotionValueX, {
    damping: 10,
    mass: 5,
    restDelta: 0.1,
  });
  const dragDeltaSpringValueY = useSpring(dragDeltaMotionValueY, {
    // bounce: 1,
    damping: 10,
    mass: 5,
    restDelta: 0.1,
  });

  const handlePlay = () => {
    dragOffsetSpringValueX.jump(0);
    dragOffsetSpringValueY.jump(0);
    dragDeltaSpringValueX.jump(0);
    dragDeltaSpringValueY.jump(0);
    ref.current.style.left = -dragOffsetSpringValueX.get() + "px";
    ref.current.style.top = -dragOffsetSpringValueY.get() + "px";
    if (isMousedOverHexWithinBoard) {
      const playAction = new PlayAction(card, mousedOverHex);
      addActionObject(playAction);
    } else if (isBurning.get() == true) {
      const burnAction = new BurnAction(card);
      addActionObject(burnAction);
    }
    isBurning.set(false);
  };

  const handleDrag = (e, info) => {
    const rect = ref.current.getBoundingClientRect();
    const posX = Math.round(rect.left + rect.width * 0.5);
    const posY = Math.round(rect.top + rect.height * 0.5);

    //offset to mouse pos (for lerp)
    const mousePosOffsetX = Math.round(posX - info.point.x);
    const mousePosOffsetY = Math.round(posY - info.point.y);
    dragOffsetMotionValueX.set(mousePosOffsetX);
    dragOffsetMotionValueY.set(mousePosOffsetY);
    ref.current.style.left = -dragOffsetSpringValueX.get() * 5 + "px";
    ref.current.style.top = -dragOffsetSpringValueY.get() * 5 + "px";

    //offset to board
    const offX = Math.abs(posX - boardPos.x);
    const offY = Math.abs(posY - boardPos.y);
    const burn = offX > BURN_TRESHOLD_X_MIN && offY < BURN_TRESHOLD_Y_MAX;
    isBurning.set(burn);

    //drag offset delta for 3d rotation
    // dragDeltaMotionValueX.set(Math.max(Math.min(info.delta.x * 5, 30), -30));
    // dragDeltaMotionValueY.set(Math.max(Math.min(info.delta.y * 5, 30), -30));
    dragDeltaMotionValueX.set(info.delta.x);
    dragDeltaMotionValueY.set(info.delta.y);
  };

  return (
    <Reorder.Item
      ref={ref}
      drag={!isPlayed && !isBurned}
      as="div"
      whileDrag={{
        scale: 0.3,
        opacity: 0.7,
        cursor: "grabbing",
        // rotateX: dragDeltaSpringValueY.get(),
        // rotateY: dragDeltaSpringValueX.get(),
      }}
      key={card}
      layout
      value={order}
      onDragStart={(e, info) => handleDrag(e, info)}
      onDrag={(e, info) => handleDrag(e, info)}
      onDragEnd={handlePlay}
      // onChange={(e, info) => handleDrag(e, info)}
      initial={{ scale: 0, translateY: "5em" }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      transition={easeOut}
      className="relative aspect-2.5/3.5 h-full w-full select-none"
      // style={{
      //   rotateX: dragDeltaSpringValueY.get(),
      //   rotateY: -dragDeltaSpringValueX.get(),
      // }}
    >
      <motion.div
        className="absolute aspect-2.5/3.5 h-full w-full select-none"
        key={card}
        whileHover={
          isPlayed || isBurned
            ? {}
            : {
                scale: 1.15,
                rotate: `${angle * 0.2}deg`,
                transition: { duration: 0.1 },
              }
        }
        style={{
          filter: !isBurning.get() && isPlayed ? "brightness(0.4)" : "none",
          // rotateX: dragDeltaSpringValueY.get() * 2 + "deg",
          // rotateY: dragDeltaSpringValueX.get() * 2 + "deg",
          rotateZ: `${angle}deg`,
        }}
      >
        <CardVisual key={order} order={order} card={card} />
        {(isBurned || isBurning.get()) && (
          <div className="absolute top-1/2 left-1/2 size-full -translate-1/2 bg-red-600 opacity-85 mix-blend-multiply"></div>
        )}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-30 size-full scale-200 text-sm font-bold text-black"></div>
      </motion.div>
      {/* <div className="absolute size-fit bg-amber-50">
        <p>x {Math.round(dragDeltaSpringValueX.get())}</p>
        <p>y {Math.round(dragDeltaSpringValueY.get())}</p>
      </div> */}
    </Reorder.Item>
  );
}
export default Card;

// const target = useMemo(() => actions[0]?.hex, [actions]);
// const targetScreenPos = useMemo(
//   () => pixelFromHex(target ?? ""),
//   [pixelFromHex, target],
// );
